import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src = {assets.logo} alt=''/>
      <button onClick={() => setToken('')} className='border border-black px-4 py-2 text-medium rounded-full hover:bg-black hover:text-white transition-all duration-500'
      >Logout</button>
    </div>
  )
}

export default Navbar
