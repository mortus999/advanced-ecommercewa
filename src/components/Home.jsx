import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css' // messes with test

const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const sortedProducts = response.data.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      });
      return sortedProducts;
    } catch (error) {
      throw new Error('Failed to fetch products. Please try again later.');
    }
  };
  

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const user  = useSelector((state) => state.user.user);

  useEffect(() => {
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      fetchProducts().then((data) => {
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      })
      .catch((error) => {
        setError(error.message);
      });;
    }
  }, []);

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
    alert('Product added to cart!');
  }, [dispatch]);

  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h1>Product Catalog</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <Link to="/cart">Go to Cart</Link>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item card">
            <img src={product.image} alt={product.title} />
            <div className="card-body">
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;