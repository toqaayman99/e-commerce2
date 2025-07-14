import React, { useEffect , useState } from 'react'
import style from './Wishlist.module.css'
import {Helmet} from "react-helmet";
import { useContext } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast'



export default function Wishlist() {

   let {wishlistProdcts , deleteWishlitItem} =  useContext(WishlistContext)
   let {addToCart}= useContext(CartContext)

   async function addProdToCart(prodId){
    let response = await addToCart(prodId)

    if (response.data.status === 'success') {
      toast.success(response?.data?.message , {
        duration:5000,
        position:'top-right'

      })
    }else{
      toast.error('error')
    }
   }

  async function handleDeleteWishlistItem(prodId){
     let response = await deleteWishlitItem(prodId)
     console.log(response);
     if (response?.data?.status==='success') {
      toast.success(response?.data?.message)
    }else{
      toast.error('item Not Deleted')
    }
     
   }
 

    useEffect( () => {

    }, [])
    
  return (
    
   <>
    <Helmet>
      <title>Wish list</title>
     </Helmet>

     {wishlistProdcts? <div className='bg-[#F8F9FA] my-28 p-11'>
        <h2 className='text-4xl font-medium mb-6'>My wish List </h2>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
   
   <tbody>
     {wishlistProdcts?.map((prod)=>{ return  <tr  key={prod?._id} className=" border-b  border-gray-200  ">
       <td className="p-4 flex items-center ">
         <img src={prod?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
         <div className='flex flex-col pl-3 '>
         <h3 className='text-black font-medium text-lg'>{prod?.title}</h3>
         <h3 className='text-black font-medium pt-1'>{prod?.price} EGP</h3>
          <div className=' cursor-pointer pt-2' >
           <i className="fa-solid fa-trash text-red-400 pr-1"></i>
           <a onClick={()=>{handleDeleteWishlistItem(prod?._id)}}  className="font-medium text-red-600 ">Remove</a>
          </div>
         </div>
       </td>

     <td>
       <button onClick={(async()=>{
          await addProdToCart(prod?._id)
         await  handleDeleteWishlistItem(prod?._id)
       })} className=' text-black px-6 py-3 my-5 border-2 border-[#22DB14] rounded-lg cursor-pointer'>Add to cart </button>

     </td>
     
      
     </tr>})}
     

   </tbody>
 </table>
        
        
        </div> :         <h2 className='text-4xl font-medium mb-6'>My wish List </h2>
 }

    
   </>
  )
}
