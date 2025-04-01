import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // 🔹 Get token from localStorage
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    // 🔹 If user is not logged in, show toast & navigate to login
    if (!token) {
      toast.warning("Please log in to access your cart!");
      navigate('/login');
      return;
    }

    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {  // Only include items with a quantity greater than 0
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products, token, navigate]);

  const handleQuantityChange = (itemId, currentQuantity) => {
    const product = products.find((product) => product._id === itemId);
    
    if (!product) return;

    const availableStock = product.stock;
    
    // Check if the current quantity exceeds the available stock
    if (currentQuantity > availableStock) {
      toast.warning(`Only ${availableStock} items available in stock`);
      return; // Do not update quantity if it exceeds stock
    }

    // Otherwise, update quantity if within stock limits
    updateQuantity(itemId, currentQuantity);
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={' CART'} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            // Handle case where product data might be missing
            if (!productData) return null;

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0] || 'default-image-url'} alt={productData.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                    </div>
                  </div>
                </div>
                <input 
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) {
                      handleQuantityChange(item._id, value);
                    }
                  }} 
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  type='number' 
                  min={1} 
                  value={item.quantity || 1}  // Use controlled input for quantity
                />
                <img 
                  onClick={() => updateQuantity(item._id, 0)} 
                  className='w-4 mr-4 sm:w-5 cursor-pointer' 
                  src={assets.binicon} 
                  alt='Delete'
                />
              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
