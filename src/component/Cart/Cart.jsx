import React, { useEffect , useState } from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import style from './Cart.module.css'
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet";


export default function Cart() {
  let { numOfCartItems , products , totalCartPrice , updateCart , deleteCartItem , deleteCart} = useContext(CartContext)

    const [ counter , setcounter] = useState(0)
    let navigate = useNavigate()

    async function handleCart(prodId , count){
      let response = await updateCart(prodId , count)
      
      if (response.data.status==='success') {
        toast.success('Product update successfully')
      }else{
        toast.error('Product Not Updated')
      }

    }
    async function handleDelete(prodId ){
      let response = await deleteCartItem(prodId )
      
      if (response.data.status==='success') {
        toast.success('Product delete successfully')
      }else{
        toast.error('Product Not Deleted')
      }
    }
    async function handleDeleteCart(){
      let response = await deleteCart()
      if (response.data.message==='success') {
        toast.success('Cart delete successfully')
        navigate('/')
      }else{
        toast.error('Cart Not Deleted')
      }
    }


    useEffect( () => {

    }, [])
    
  return (


    <>
     <Helmet>
      <title>Cart</title>
     </Helmet>
    
   
   
   {products?   <div className='bg-[#F8F9FA] my-28 p-11'>
    <div >
      <div className='flex justify-between'>
      <h2 className='text-4xl font-medium mb-6'>Cart Shop </h2>

      <Link to='/checkout'>
       <button  type='submit' className='px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-all duration-300'>Check out</button>
      </Link>

      </div>
    <div className='flex justify-between'>
    <h3 className='text-lg font-medium'> Total price : <span className='text-[#22DB1B]'>{totalCartPrice}</span>  </h3>
    <h3  className='text-lg font-medium'>Total number of items : <span className='text-[#22DB1B]'>{numOfCartItems} EGP</span> </h3>
    </div>
   
    </div>

   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
   
    <tbody>
      {products?.map((prod)=>{ return <tr key={prod?.product?._id} className=" border-b  border-gray-200  ">
        <td className="p-4 flex items-center ">
          <img src={prod?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
          <div className='flex flex-col pl-3 '>
          <h3 className='text-black font-medium text-lg'>{prod?.product?.title}</h3>
          <h3 className='text-black font-medium pt-1'>{prod?.price} EGP</h3>
           <div className=' cursor-pointer pt-2' >
            <i className="fa-solid fa-trash text-red-400 pr-1"></i>
            <a onClick={()=>{handleDelete(prod?.product?._id)}}  className="font-medium text-red-600 ">Remove</a>
           </div>
          </div>
        </td>
 
        <td className="px-6 py-4">
          <div className="flex items-center ">
            <button onClick={()=>{handleCart(prod?.product?._id, prod.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-[#22DB14] rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span className=" w-8 text-gray-900  px-2.5 py-1 ">  {prod?.count}  </span>  
            </div>
            <button onClick={()=>{handleCart(prod?.product?._id, prod.count + 1)}} className="inline-flex items-center justify-center h-8 w-8 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-[#22DB14] rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
      
       
      </tr>})}
      

    </tbody>
  </table>
   </div>
   <div className="flex justify-center">
    <button onClick={handleDeleteCart} className="px-6 py-3 my-5 border-2 border-[#22DB14] rounded-lg cursor-pointer">Clear your cart</button>
   </div>

    
    </div> : 
       <div className=' mt-8 ' >
       <h2 className='text-4xl font-medium mb-6'>Cart Shop </h2>       
       <h2 className='text-3xl font-medium mb-6'> your Cart Shop is empty </h2>       
       </div>
      } 
   
    </>
  )
}
