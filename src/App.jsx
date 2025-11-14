import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/layout/Header.jsx';
import AppRouter from './router/AppRouter.jsx';

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Header />
                <main style={{ padding: '1rem' }}>
                    <AppRouter />
                </main>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
