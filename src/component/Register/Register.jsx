import React, { useEffect , useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import style from './Register.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import {Helmet} from "react-helmet";


export default function Register() {
  let {setuserLogin} = useContext(UserContext)
    const [ errMsg , seterrMsg] = useState(0)
    const [ isLoading , setisLoading] = useState(false)
    useEffect( () => {}, [])

    let navigate = useNavigate()
     function submitForm(val){
      setisLoading(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , val).then(({data})=>{

        setisLoading(false)

        if (data.message==='success') {
          setuserLogin(data?.token)
          navigate('/')
          localStorage.setItem('userToken' , data?.token)
          
        }
        
      }).catch((error)=>{
        setisLoading(false)
      seterrMsg(error?.response?.data?.message)

    })



    }



    let validationSchema = Yup.object().shape({
      name:Yup.string().required("name is required").min(3 , "min 3 letters").max(6 , " max 6 letters"),
      email:Yup.string().required('email is required').email("invalid email"),
      password:Yup.string().required('pass is required').matches(/^[A-Z][a-z0-9]{4,10}$/ , 'invalid pass'),
      rePassword:Yup.string().required('repass is required').oneOf([Yup.ref('password')] , "passwords must match"),
      phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'invalid phone')
    })



    let formik = useFormik({
      initialValues:{
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:"",
      },
      validationSchema:validationSchema
      ,
      onSubmit:submitForm
      
    })


    
  return (
    <>
    <Helmet>
      <title>Register</title>
     </Helmet>
     <div className=" p-6">
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
       Register now
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
          <div className="mt-1">
            <input value={ formik.values.name} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='name' name="name" type="text"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>


         

          {formik.errors.name && formik.touched.name?  <div className="bg-red-100 px-6 py-2 my-4 border border-red-400 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.name} </span>
          </div> : null}



        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input value={ formik.values.email} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='email' name="email" type="email" autoComplete="email-address"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>
          

           {formik.errors.email && formik.touched.email?  <div className="bg-red-100 border border-red-400 px-6 py-2  my-4 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.email} </span>
          </div> : null}


        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input value={ formik.values.password} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='password' name="password" type="password" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>

          

           {formik.errors.password  && formik.touched.password?  <div className="bg-red-100 border border-red-400 px-6 py-2  my-4 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.password} </span>
          </div> : null}

        </div>
        <div>
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700"> RePassword</label>
          <div className="mt-1">
            <input value={ formik.values.rePassword} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='rePassword' name="rePassword" type="password" autoComplete="confirm-password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>

          

           {formik.errors.rePassword  && formik.touched.rePassword?  <div className="bg-red-100 border border-red-400 px-6 py-2  my-4 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.rePassword} </span>
          </div> : null}

        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
          <div className="mt-1">
            <input value={ formik.values.phone} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='phone' name="phone" type="tel" autoComplete="phone"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>

          

           {formik.errors.phone  && formik.touched.phone?  <div className="bg-red-100 border border-red-400 px-6 py-2  my-4 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {formik.errors.phone} </span>
          </div> : null}
        </div>
        <div>
        <button type="submit"   disabled={!(formik.isValid && formik.dirty)}  className= {` float-right rounded-md border py-4 px-8  font-medium text-gray-600 shadow-sm   ${formik.isValid && formik.dirty ? 'bg-[#3FA43F] text-white cursor-pointer' : 'text-gray-600 '} `} >  {isLoading? <i className=' fas fa-spinner fa-spin'> </i> : 'Register now ' }
          </button>
        </div>


        

         {errMsg?  <div className="bg-red-200 px-6 py-2 my-4 rounded-md text-md flex items-center">
        
          <span className="text-red-800"> {errMsg} </span>
          </div> : null}
      </form>
    </div>
</>
  )
}
