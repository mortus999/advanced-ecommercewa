import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, removeFromCart, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = useCallback((id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCart({ id, quantity }));
    }
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((id) => {
    dispatch(removeFromCart({ id }));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    alert('Checkout successful! Your cart has been cleared.');
  }, [dispatch]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Nothing in your cart</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
              <img src={item.image} alt={item.title} style={{ width: '120px', height: '150px'}} />
              </div>
              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h2>Total Items: {totalItems}</h2>
          <h2>Total Price: ${totalPrice}</h2>
          <button onClick={handleClearCart}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;