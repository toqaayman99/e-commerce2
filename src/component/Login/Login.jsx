import React, { useEffect , useState } from 'react'
import { Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import style from './Login.module.css'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom'


export default function Login() {
  
  let {setuserLogin} = useContext(UserContext)
  const [ errMsg , seterrMsg] = useState(0)
  const [ isLoading , setisLoading] = useState(false)
  useEffect( () => {}, [])

  let navigate = useNavigate()

   function submitForm(val){
    setisLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , val).then(({data})=>{

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
      email:Yup.string().required('email is required').email("invalid email"),
      password:Yup.string().required('pass is required').matches(/^[A-Z][a-z0-9]{4,10}$/ , 'invalid pass'),
    })



    let formik = useFormik({
      initialValues:{
        email:"",
        password:"",
      },
      validationSchema:validationSchema
      ,
      onSubmit:submitForm
      
    })


    
  return (
    <>
    <Helmet>
      <title>Login</title>
     </Helmet>
    
     <div className="">
      <h2 className="my-3 text-center text-3xl  text-black">
        Login Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
       
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input value={ formik.values.email} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='email' name="email" type="email" autoComplete="email-address"  className="px-2 py-3 mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>
          

           {formik.errors.email && formik.touched.email?  <div className="bg-red-100 px-6 py-2 border border-red-400 my-4 rounded-md text-md flex items-center ">
          <span className="text-red-800"> {formik.errors.email} </span>
          </div> : null}


        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input value={ formik.values.password} onBlur={ formik.handleBlur } onChange={ formik.handleChange } id='password' name="password" type="password" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
          </div>

          

           {formik.errors.password  && formik.touched.password?  <div className="bg-red-100 px-6 py-2 border border-red-400 my-4 rounded-md text-md flex items-center ">
          
          <span className="text-red-800"> {formik.errors.password} </span>
          </div> : null}

        </div>
      
        
        <div className=' flex justify-between items-center '>
          <Link to='/forgetpassword'>
          <h2 className=' text-lg  hover:text-[#3FA43F] transition-all duration-300 cursor-pointer'>forget your password ?</h2>
          </Link>
          <button type="submit"   disabled={!(formik.isValid && formik.dirty)}  className= {` rounded-md border py-4 px-8  font-medium text-gray-600 shadow-sm   ${formik.isValid && formik.dirty ? 'bg-[#3FA43F] text-white cursor-pointer' : 'text-gray-600 '} `} >  {isLoading? <i className=' fas fa-spinner fa-spin'> </i> : 'Login now ' }
          </button>
        </div>

       

        {errMsg?  <div className="bg-red-100 px-6 py-2 border border-red-400 my-4 rounded-md text-md flex items-center ">
          
          <span className="text-red-800"> {errMsg} </span>
          </div> : null}
      </form>
    </div>
</>
  )
}
