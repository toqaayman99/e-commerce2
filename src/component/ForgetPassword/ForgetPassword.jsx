import React, { useEffect , useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import style from './ForgetPassword.module.css'

export default function ForgetPassword() {
    const [ counter , setcounter] = useState(0)
    let navigate =useNavigate()


    function forgetPassword(userEmail){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {
            email:userEmail
        }).then((response)=>{
            navigate('/verifycode')
            return response
        }).catch((error)=>{
            return error
        })
    }
   
  
   async function submitForm (val){
      const response = await forgetPassword(val.email);

      if (response?.data?.statusMsg === 'success') {
        toast.success('Check your email for the reset code');
      } else {
        toast.error(response?.response?.data?.message);
      }
    
  }


     let formik = useFormik({
      initialValues:{
        email:"",
      
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
      })
      ,
      onSubmit:submitForm
      
    })

  
    useEffect( () => {

    }, [])
    
  return (
  <>
  <h2 className=' text-3xl font-medium mb-4 '>please enter your verification code</h2>
  <form action="" onSubmit={formik.handleSubmit}>
  <input placeholder='Email'  id='email' name="email" type="email" autoComplete="email-address" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="px-2 py-3 mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
  <button type='submit' className=' text-[#4FA74F] px-6 py-3 my-5 border border-[#4FA74F] rounded-lg cursor-pointer hover:bg-[#198754] hover:text-white transition-all duration-300'> Verify </button>


  </form>
 

  
  
  </>
  )
}
