import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast'

import style from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [ counter , setcounter] = useState(0)
    let navigate = useNavigate()

    function resetPassword(userEmail , newPass ){
      return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , {
        email:userEmail,
        newPassword:newPass
      }).then((response)=>{
        navigate('/login')
        return response
    }).catch((error)=>{
        return error
    })
    }

    async function submitForm (val){
      const response = await resetPassword(val.email , val.newPassword);

      if (response?.request?.statusText === "OK") {
        toast.success('Reset password done');
      } else {
        toast.error(response?.response?.data?.message);
      }
    
  }

    
    let formik = useFormik({
      initialValues:{
        email:"",
        newPassword:""
      
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        newPassword:Yup.string().required('pass is required').matches(/^[A-Z][a-z0-9]{4,10}$/ , 'invalid pass'),

      })
      ,
      onSubmit:submitForm
      
    })



    useEffect( () => {

    }, [])
    
  return (
    <>
  <h2 className=' text-3xl font-medium my-4 '>Reset your account password</h2>
  <form action="" onSubmit={formik.handleSubmit} >
  <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email'  id='email' name="email" type="email" autoComplete="email-address"  className="px-2 py-3 my-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
  <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Password' id='password' name="newPassword" type="password" autoComplete="password"  className="px-2 py-3 my-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />

  <button type='submit' className=' text-[#4FA74F] px-6 py-3 my-5 border border-[#4FA74F] rounded-lg cursor-pointer hover:bg-[#198754] hover:text-white transition-all duration-300'> Verify </button>


  </form>
 

  
  </>
  )
}
