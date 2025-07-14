import React, { useEffect , useState } from 'react'
import style from './CheckOut.module.css'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";
import { useNavigate } from 'react-router-dom';



export default function CheckOut() {
    const [ isOnline , setisOnline] = useState(0)
    let {cartId , resetCart} = useContext(CartContext)
   let navigate=  useNavigate()

    function payCash(val){
      console.log(val);
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
        shippingAddress:val
      } , {
        headers:{
          token:localStorage.getItem('userToken')
        }
      }).then((response)=>{
        console.log(response);
        if (response.data.status='success') {
          toast.success('check out done')
          resetCart()
          navigate('/')

        }else{
          toast.error('error in checkout')
        }
      }).catch((error)=>{
        console.log(error);
      })

    }

   

    function payOnline(val) {
      axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/`,
        {
          shippingAddress: val
        },
        {
          headers: {
            token: localStorage.getItem('userToken')
          }
        }
      )
      .then((response) => {
        console.log(response);
        if (response?.data?.status === 'success') {
          window.location.href=response.data.session.url
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function detectPayment(val){
      if (isOnline) {
        payOnline(val)
      }else{
        payCash(val)
      }
    }
    

    let validationSchema = Yup.object().shape({
      details:Yup.string().required("details is required"),
      phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'invalid phone'),
      city:Yup.string().required("city is required")
    })

    let formik = useFormik({
      initialValues:{
        details:"",
        phone:"",
        city:""
      },
      
      validationSchema:validationSchema
      ,

      onSubmit:detectPayment
      
    })


    useEffect( () => {

    }, [])
    
  return (
    <>
    <Helmet>
      <title>Checkout</title>
     </Helmet>
    
<div className="flex ">
  <div className="w-full">
    <div className="bg-white p-10 rounded-lg  md:w-3/4 mx-auto lg:w-1/2">
      <form  onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="details" className=" mb-2  text-gray-800">Details</label>
          <input value={formik.values.details} onBlur={ formik.handleBlur } onChange={formik.handleChange} type="text" id="details" name="details" className="border border-gray-300  p-2 w-full rounded " />
         {formik.errors.details && formik.touched.details?  <div className="bg-red-100 px-6 py-2 my-4 border border-red-400 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.details} </span>
          </div> : null}
        </div>
        
        <div className="mb-5">
          <label htmlFor="phone" className=" mb-2  text-gray-800">Phone</label>
          <input value={formik.values.phone} onBlur={ formik.handleBlur } onChange={formik.handleChange} type="text" id="phone" name="phone" className="border border-gray-300  p-2 w-full rounded " />
          {formik.errors.phone && formik.touched.phone?  <div className="bg-red-100 px-6 py-2 my-4 border border-red-400 rounded-md text-md flex items-center">
        
        <span className="text-red-800"> {formik.errors.phone} </span>
        </div> : null}
        </div>
        <div className="mb-5">
          <label htmlFor="city" className=" mb-2  text-gray-800">City</label>
          <input value={formik.values.city} onBlur={ formik.handleBlur } onChange={formik.handleChange} type="text" id="city" name="city" className="border border-gray-300  p-2 w-full rounded " />
        {formik.errors.city && formik.touched.city?  <div className="bg-red-100 px-6 py-2 my-4 border border-red-400 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.city} </span>
          </div> : null}
        </div>
     
        <button onClick={(()=>{
          setisOnline(false)
        })} type='submit' className="  w-full border-2 border-blue-500 bg-white text-blue-500 font-bold p-2 my-3 rounded-lg cursor-pointer">Pay cash</button>
        <button  onClick={(()=>{
          setisOnline(true)
        })} type='submit' className="  w-full border-2 border-blue-500 bg-white text-blue-500 font-bold p-2 rounded-lg cursor-pointer">Pay online</button>
      </form>
    </div>
  </div>
</div>

    
    </>
  )
}
