import {useEffect, useState} from 'react';

export function useCachedFetch(key, fetchFn, ttlMs = 60 * 60 * 1000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem(key);
        const exp = localStorage.getItem(`${key}_exp`);
        const now = Date.now();

        if (cached && exp && now < Number(exp)) {
            setData(JSON.parse(cached));
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const result = await fetchFn();
                setData(result);
                localStorage.setItem(key, JSON.stringify(result));
                localStorage.setItem(`${key}_exp`, String(now + ttlMs));
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [key, fetchFn, ttlMs]);

    return {data, loading, error};
}