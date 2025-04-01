import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  // const [attribute, setAttribute] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {

      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt='' />
          </div>
        </div>

        {/* product information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.staricon} alt="" className="w-3 5" />
            <img src={assets.staricon} alt="" className="w-3 5" />
            <img src={assets.staricon} alt="" className="w-3 5" />
            <img src={assets.staricon} alt="" className="w-3 5" />
            <img src={assets.stardullicon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 mb-5 text-gray-500 md:w-4/5'> Stock : {productData.stock}</p>
          <p className='mt-5 mb-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id)}
            className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ${productData.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={productData.stock === 0} // Disable the button if stock is 0
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>Easy Return and Exchange Policy Within 7 Days</p>
          </div>
        </div>
      </div>

      {/* description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>I absolutely love this product! The quality is exceptional, and it has added so much style.</p>
          <p>It’s exactly as described and meets all my expectations.</p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} />

    </div>
  ) : <div className='opacity-0'></div>;
}

export default Product;
