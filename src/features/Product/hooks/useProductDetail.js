import productApi from 'api/product';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);
        setProduct(result);
      } catch (err) {
        console.log('Faild to fetch product', err);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
