// components/Products.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      const fetchProducts = async () => {
        try {
          const response = await api.get('/products', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProducts();
    }
  }, [token]);

  const handleAddProduct = async () => {
    if (token) {
      try {
        await api.post(
          '/products',
          { name, price, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (token) {
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {!token && (
        <h1>Please log in to see the products page</h1>
      )}
      {token && (
        <>
          <h1>Products</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddProduct}>Add Product</button>
          <ul>
            {products.map((product: any) => (
              <li key={product._id}>
                {product.name} - ${product.price} - {product.description}
                <button onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Products;