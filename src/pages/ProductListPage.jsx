import {useMemo, useState} from 'react';
import {fetchProducts} from '../api/productApi.js';
import {useCachedFetch} from '../hooks/useCachedFetch.js';
import SearchBar from '../components/common/SearchBar.jsx';
import ProductCard from '../components/products/ProductCard.jsx';

function ProductListPage() {
    const [query, setQuery] = useState('');

    const {data: products, loading, error} = useCachedFetch('products', fetchProducts);

    const filtered = useMemo(() => {
        if (!products) return [];
        if (!query.trim()) return products;

        const q = query.toLowerCase();
        return products.filter((p) => {
            const brand = (p.brand || '').toLowerCase();
            const model = (p.model || '').toLowerCase();
            return brand.includes(q) || model.includes(q);
        });
    }, [products, query]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>There was an error loading products.</p>;
    }

    return (<div>
        <SearchBar value={query} onChange={setQuery}/>
        <div
            style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem',
            }}
        >
            {filtered.map((product) => (<ProductCard key={product.id} product={product}/>))}
            {filtered.length === 0 && <p>No products found.</p>}
        </div>
    </div>);
}

export default ProductListPage;