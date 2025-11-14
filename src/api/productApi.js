import axios from 'axios';

const BASE_URL = 'https://itx-frontend-test.onrender.com';

export async function fetchProducts() {
    const {data} = await axios.get(`${BASE_URL}/api/product`);
    return data;
}

export async function fetchProductById(id) {
    const {data} = await axios.get(`${BASE_URL}/api/product/${id}`);
    return data;
}