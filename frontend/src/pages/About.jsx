import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.aboutimg} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 '>
        <p>At English Home, we believe in creating spaces that feel like home. With a passion for timeless design and exceptional quality, we offer a wide range of home decor products to transform your living space. From stylish furniture and cozy textiles to elegant accessories, our collections are carefully curated to bring comfort, warmth, and sophistication to every room. </p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission at English Home is to provide high-quality, stylish home decor that transforms living spaces into warm, inviting, and functional environments. We are committed to offering a wide range of thoughtfully designed products that blend timeless elegance with modern trends, ensuring our customers can create the perfect atmosphere in their homes.</p>
        </div>
      </div>

      <div className='text-3xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p>We are dedicated to providing products that meet the highest standards of craftsmanship and durability.</p>
        </div>

        <div className='border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Convenience:</b>
          <p>At English Home, we prioritize your convenience by offering a seamless shopping experience both online and in-store.</p>
        </div>

        <div className='border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Exceptional Customer Service:</b>
          <p>At English Home, exceptional customer service is at the heart of everything we do. We are committed to providing a personalized experience.</p>
        </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
