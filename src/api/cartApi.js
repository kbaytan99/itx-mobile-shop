import axios from 'axios';

const BASE_URL = 'https://itx-frontend-test.onrender.com';

export async function addToCart({id, colorCode, storageCode}) {
    const {data} = await axios.post(`${BASE_URL}/api/cart`, {
        id, colorCode, storageCode,
    });

    return data;
}