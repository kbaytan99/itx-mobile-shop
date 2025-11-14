import { Routes, Route } from 'react-router-dom';
import ProductListPage from '../pages/ProductListPage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
    </Routes>
);

export default AppRouter;
