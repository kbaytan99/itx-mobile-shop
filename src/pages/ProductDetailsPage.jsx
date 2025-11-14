import {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {fetchProductById} from '../api/productApi.js';
import {addToCart} from '../api/cartApi.js';
import {useCachedFetch} from '../hooks/useCachedFetch.js';
import {useCart} from '../context/CartContext.jsx';

function ProductDetailsPage() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname ?? '/';
    const {updateCount} = useCart();

    const {data: product, loading, error} = useCachedFetch(
        `product_${id}`,
        () => fetchProductById(id)
    );

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const colors = useMemo(
        () => (product?.options?.colors ?? []),
        [product]
    );
    const storages = useMemo(
        () => (product?.options?.storages ?? []),
        [product]
    );

    useEffect(() => {
        if (colors.length && !selectedColor) {
            setSelectedColor(String(colors[0].code));
        }
        if (storages.length && !selectedStorage) {
            setSelectedStorage(String(storages[0].code));
        }
    }, [colors, storages, selectedColor, selectedStorage]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>There was an error loading product.</p>;
    if (!product) return <p>Product not found.</p>;

    const handleAddToCart = async () => {
        setSubmitError(null);
        try {
            setSubmitting(true);
            const result = await addToCart({
                id: product.id,
                colorCode: Number(selectedColor),
                storageCode: Number(selectedStorage),
            });
            if (typeof result?.count === 'number') {
                updateCount(result.count);
            }
        } catch {
            setSubmitError('Error adding product to cart');
        } finally {
            setSubmitting(false);
        }
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div>
            <div style={{marginBottom: '1rem'}}>
                <button
                    type="button"
                    onClick={handleBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        textDecoration: 'underline',
                        color: '#1976d2',
                        cursor: 'pointer',
                    }}
                >
                    ← Back to product list
                </button>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.8fr)',
                    gap: '2rem',
                    alignItems: 'flex-start',
                }}
            >
                {/* LEFT: IMAGE */}
                <section
                    style={{
                        backgroundColor: '#e8f5e9',
                        padding: '1.5rem',
                        borderRadius: '8px',
                    }}
                >
                    <h2 style={{marginBottom: '1rem'}}>Details view</h2>
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '260px',
                        }}
                    >
                        {product.imgUrl && (
                            <img
                                src={product.imgUrl}
                                alt={product.model}
                                style={{
                                    maxWidth: '240px',
                                    maxHeight: '260px',
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                    </div>
                </section>

                {/* RIGHT: DESCRIPTION + ACTIONS */}
                <section
                    style={{
                        backgroundColor: '#e8f5e9',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <h1>
                        {product.brand} {product.model}
                    </h1>
                    {product.price && (
                        <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#1976d2'}}>
                            {product.price} €
                        </p>
                    )}

                    {/* DESCRIPTION */}
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '1rem',
                        }}
                    >
                        <h2 style={{marginBottom: '0.5rem'}}>Description</h2>
                        <ul style={{listStyle: 'disc', paddingLeft: '1.25rem'}}>
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>Model:</strong> {product.model}</li>
                            <li><strong>CPU:</strong> {product.cpu}</li>
                            <li><strong>RAM:</strong> {product.ram}</li>
                            <li><strong>OS:</strong> {product.os}</li>
                            <li><strong>Screen:</strong> {product.displayResolution}</li>
                            <li><strong>Battery:</strong> {product.battery}</li>
                            <li>
                                <strong>Cameras:</strong> {product.primaryCamera} /{' '}
                                {product.secondaryCamera}
                            </li>
                            <li><strong>Dimensions:</strong> {product.dimentions}</li>
                            <li><strong>Weight:</strong> {product.weight} g</li>
                        </ul>
                    </div>

                    {/* ACTIONS */}
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                        }}
                    >
                        <h2>Actions</h2>

                        <div>
                            <label>
                                Storage:{' '}
                                <select
                                    value={selectedStorage}
                                    onChange={(e) => setSelectedStorage(e.target.value)}
                                >
                                    {storages.map((s) => (
                                        <option key={s.code} value={s.code}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Color:{' '}
                                <select
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                >
                                    {colors.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={submitting || !selectedColor || !selectedStorage}
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            {submitting ? 'Adding...' : 'Add to cart'}
                        </button>

                        {submitError && (
                            <p style={{color: 'red', marginTop: '0.5rem'}}>{submitError}</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductDetailsPage;