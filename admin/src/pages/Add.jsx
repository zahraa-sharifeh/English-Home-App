import React, { useLayoutEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(''); // Add stock state
    const [category, setCategory] = useState('')
    const [bestseller, setBestseller] = useState(false)
    // const [attributes, setAttributes] = useState([])

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData()
            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("bestseller",bestseller)
            formData.append("stock", stock);
            // formData.append("attributes",JSON.stringify(attributes))

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}})
            if (response?.data?.success) {
                toast.success(response.data.message);
                resetForm();
            } else {
                toast.error(response?.data?.message || "Failed to add product!");
            }
    
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message || "An error occurred!");
        }
    }

    const resetForm = () => {
        console.log("Resetting form...");
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setBestseller(false);
        // setAttributes([]);
        setStock('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        console.log("Form reset successfully!");
    };
    

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
            <label htmlFor='image1'>
                <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            <label htmlFor='image2'>
                <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>
            <label htmlFor='image3'>
                <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>
            <label htmlFor='image4'>
                <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
        </div>
      </div>

        <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input  onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Product Category</p>
                <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="">Select Category</option> // Add a placeholder
                    <option value="Bath">Bath</option>
                    <option value="Table">Table</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bed">Bed</option>
                    <option value="Decor">Decor</option>
                    <option value="Carpet">Carpet</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e)=> setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='25'/>
            </div>

            
        <div>
            <p className='mb-2'>Stock Quantity</p>
            <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                className='w-full max-w-[500px] px-3 py-2'
                type='number'
                placeholder='Enter stock quantity'
                required
            />
        </div>

        </div>

        {/* <div>
            <p className='mb-2'>Product Attribute</p>
            <div className='flex gap-3'>
                <div onClick={(e)=>setAttributes(prev => prev.includes("ATT1") ?prev.filter(item => item !== "ATT1") : [...prev,"ATT1"])}>
                    <p className={`${attributes.includes('ATT1') ? "bg-slate-300" : "bg-gray-200" } px-3 py-1 cursor-pointer`}>ATT1</p>
                </div>

                <div onClick={(e)=>setAttributes(prev => prev.includes("ATT2") ?prev.filter(item => item !== "ATT2") : [...prev,"ATT2"])}>
                    <p className={`${attributes.includes('ATT2') ? "bg-slate-300" : "bg-gray-200" } px-3 py-1 cursor-pointer`}>ATT2</p>
                </div>
                <div onClick={(e)=>setAttributes(prev => prev.includes("ATT3") ?prev.filter(item => item !== "ATT3") : [...prev,"ATT3"])}>
                    <p className={`${attributes.includes('ATT3') ? "bg-slate-300" : "bg-gray-200" } px-3 py-1 cursor-pointer`}>ATT3</p>
                </div>
                <div onClick={(e)=>setAttributes(prev => prev.includes("ATT4") ?prev.filter(item => item !== "ATT4") : [...prev,"ATT4"])}>
                    <p className={`${attributes.includes('ATT4') ? "bg-slate-300" : "bg-gray-200" } px-3 py-1 cursor-pointer`}>ATT4</p>
                </div>
            
            </div>
        </div> */}

        <div className='flex gap-2 mt-2'>
            <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>Add</button>

    </form>
  )
}

export default Add
