import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item!== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {


    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch(sortType) {
      case 'low-high' :
        setFilterProducts(fpCopy.sort((a,b) =>(a.price - b.price)));
        break;

        case 'high-low' :
          setFilterProducts(fpCopy.sort((a,b) =>(b.price - a.price)));
          break;
      
          default :
            applyFilter();
            break;

    }
  }

  useEffect(() => {
   applyFilter()
  },[products,category,search,showSearch])

  useEffect(() => {
    sortProduct();
   },[sortType])





  return (
    <div className=' flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>

        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img  className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdownicon} alt=''/>
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light'>

          <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Table'} onChange={toggleCategory}/> Table
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Carpet'} onChange={toggleCategory}/> Carpet
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Kitchen'} onChange={toggleCategory}/> Kitchen
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Bed'} onChange={toggleCategory}/> Bed
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Bath'} onChange={toggleCategory}/> Bath
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox'value={'Decor'} onChange={toggleCategory}/> Decor
            </p>

          </div>
        </div>
      </div>

    {/* Right Side */}
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL'} text2={' COLLECTIONS'}/>
        {/* Product Sort */}
        <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort By : Relavent</option>
          <option value="low-high">Sort By : Low to High</option>
          <option value="high-low">Sort By : High to Low</option>
        </select>
      </div>

    {/* Map Products */}
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
      {
        filterProducts.map((item,index) =>(
          <ProductItem key={index} 
          name={item.name} id={item._id} price={item.price}
          image={item.image}
          />
        ))
      }
    </div>

    </div>
    </div>
  )
}

export default Collection
