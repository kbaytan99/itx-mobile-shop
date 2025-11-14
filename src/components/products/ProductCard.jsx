import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function ProductCard({ product }) {
    const { id, brand, model, price, imgUrl } = product;
    const location = useLocation();
    const navState = useMemo(() => ({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: location.state,
    }), [location.pathname, location.search, location.hash, location.state]);

    return (
        <article
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '0.75rem',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Link
                to={`/product/${id}`}
                state={{ from: navState }}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    {imgUrl && (
                        <img
                            src={imgUrl}
                            alt={`${brand} ${model}`}
                            style={{ maxWidth: '100px', maxHeight: '120px', objectFit: 'contain' }}
                        />
                    )}
                </div>
                <div>
                    <h2 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                        {brand} {model}
                    </h2>
                    {price && (
                        <p style={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {price} €
                        </p>
                    )}
                </div>
            </Link>
        </article>
    );
}

export default ProductCard;
