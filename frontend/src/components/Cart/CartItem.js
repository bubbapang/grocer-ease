import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItemThunk, deleteCartItemThunk } from '../../store/cartItem';

export default function CartItem({ item, cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const handleQuantityChange = (e) => { // for the number box input
    const newQuantity = (e.target.value);
    setQuantity(newQuantity);
    dispatch(updateCartItemThunk(cartItem.id, newQuantity));
  };

  const handleQuantityIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateCartItemThunk(cartItem.id, newQuantity));
  };

  const handleQuantityDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    dispatch(updateCartItemThunk(cartItem.id, newQuantity));
  };

  const handleRemoveItem = () => {
    dispatch(deleteCartItemThunk(cartItem.id));
  };

  // const handleClearItems = () => {
  //   // insert code here
  // };

  return (
    <li className="cart-item">
      <div className="cart-item-image"> <img src={item.url} alt={item.name} /> </div>
      <div className="cart-item-header">{item.name}</div>
      <div className="cart-item-price">${item.price}</div>
      <div className="cart-item-menu">
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <button className="cart-item-button" onClick={handleQuantityIncrement}>+</button>
        <button className="cart-item-button" onClick={handleQuantityDecrement}>-</button>
        <button className="cart-item-button" onClick={handleRemoveItem}>Remove</button>
      </div>
    </li>
  );
}
