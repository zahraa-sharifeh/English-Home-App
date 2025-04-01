import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
<div>
    <img src={assets.logo} className='mb-3 w-32' alt="" />
    <p className='w-full md:w-2/3 text-gray-600 '>
    English Home combines modern trends with traditional aesthetics to create cozy and inviting living spaces.
    </p>
</div>

    <div>
        <br/><br/>
        <p className='text-xl font-medium mb-3'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
    </div>

    <div> 
        <br/><br/>
        <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+961 81 062 088</li>
            <li>support@englishhome.com</li>
        </ul>
    </div>

      </div>
            
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>copyright2024@englishhome.com - All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer
