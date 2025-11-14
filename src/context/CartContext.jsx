/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState} from 'react';

const CartContext = createContext();

const CART_KEY = 'itx-cart-count';
const CART_EXP_KEY = 'itx-cart-count-exp';
const ONE_HOUR_MS = 60 * 60 * 1000;

function getInitialCount() {
    const saved = localStorage.getItem(CART_KEY);
    const exp = localStorage.getItem(CART_EXP_KEY);
    const now = Date.now();

    if (saved && exp && now < Number(exp)) {
        return Number(saved);
    }
    return 0;
}

export function CartProvider({children}) {
    const [count, setCount] = useState(getInitialCount);

    const updateCount = (newCount) => {
        setCount(newCount);
        localStorage.setItem(CART_KEY, String(newCount));
        localStorage.setItem(CART_EXP_KEY, String(Date.now() + ONE_HOUR_MS));
    };

    return (<CartContext.Provider value={{count, updateCount}}>
        {children}
    </CartContext.Provider>);
}

export const useCart = () => useContext(CartContext);