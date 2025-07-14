import axios from 'axios'
import React, { useContext, useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast'

import style from './Productdetails.module.css'
import { WishlistContext } from '../../Context/WishlistContext';

export default function Productdetails() {
  let {addToCart} = useContext(CartContext)
  let {wishlist , wishlistProdcts ,deleteWishlitItem} = useContext(WishlistContext)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let {id} = useParams()
  const [ productDetails , setproductDetails] = useState(null)

    function getProductDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
        setproductDetails(data?.data)

      }).catch((error)=>{
        console.log(error);

      })
    }

    async function handleAddToCart(prodId){
      let response = await addToCart(prodId)
      console.log(response);
      if (response.data.status === 'success') {
        toast.success(response?.data?.message , {
          duration:5000,
          position:'top-right'
  
        })
      }else{
        toast.error('error')
      }
  
    }

    async function addProdToWishlist(prodId){
      let response = await wishlist(prodId)
      console.log(response);
      if (response.data.status === 'success') {
        toast.success(response?.data?.message , {
          duration:5000,
          position:'top-right'
 
        })
      }else{
        toast.error('error')
      }
    }

    useEffect( () => {
      getProductDetails()

    }, [])
    
  return (
    <>
    {productDetails?    <div className="flex flex-wrap items-center">

<div className='w-full md:w-1/4'>
<Slider {...settings}>
  {productDetails?.images.map((src)=>{return    <img src={src} alt="" />
  })}
</Slider>
</div>

<div className='w-full md:w-3/4'>
  <h2 className=' text-3xl font-medium mb-2 '>{productDetails?.title}</h2>
  <p className='mb-4 '>{productDetails?.description}</p>
  <div className='flex justify-between '>
   <span> {productDetails?.price} EGP</span>
   <span> <i className='fas fa-star text-yellow-400'></i> {productDetails?.ratingsAverage} </span>
  </div>
  
  <div className='flex items-center mt-6 justify-between '>
   <button onClick={(()=>{
     handleAddToCart(productDetails?.id)
   })} className=' w-3/4 mx-auto bg-[#22db14] py-2 my-2 rounded-md text-white cursor-pointer hover:'> + Add </button>



   {/* <i onClick={(()=>{
     addProdToWishlist(productDetails?.id)
   })} className={`${
    wishlistProdcts?.some((item) => item._id === productDetails._id)
      ? 'text-red-500'
      : null
  } fa-solid fa-heart h3 text-3xl font-bold text-[#1f513b]`}></i> */}






<i
  onClick={() => {
    const isInWishlist = wishlistProdcts?.some(
      (item) => item._id === productDetails._id
    );

    if (isInWishlist) {
      deleteWishlitItem(productDetails._id); 
    } else {
      addProdToWishlist(productDetails._id);
    }
  }}
  className={`fa-solid fa-heart h3 text-3xl font-bold transition-colors duration-300 cursor-pointer ${
    wishlistProdcts?.some((item) => item._id === productDetails._id)
      ? 'text-red-500'
      : 'text-[#1f513b]'
  }`}
/>




  </div>
  

</div>

</div> : <Spinner/>}
 
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
