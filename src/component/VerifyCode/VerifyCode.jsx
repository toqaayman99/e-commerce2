import React, { useEffect , useState } from 'react'
import style from './VerifyCode.module.css'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



export default function VerifyCode() {
    const [ counter , setcounter] = useState(0)
    let navigate = useNavigate()

    function verifyCode(code){
     return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , {
        resetCode:code
      }).then((response)=>{
        navigate('/resetpassword')
        return response
    }).catch((error)=>{
        return error
    })
    }

    async function submitForm (val){
      const response = await verifyCode(val.code);

      if (response?.data?.status === 'Success') {
        toast.success('code verified');
      } else {
        toast.error(response?.response?.data?.message);
      }
    
  }


     let formik = useFormik({
      initialValues:{
        code:"",
      
      }
      ,
      onSubmit:submitForm
      
    })


    useEffect( () => {

    }, [])
    
  return (
   <>

   
  <h2 className=' text-3xl font-medium mb-4 '>reset your account password</h2>
  <form action=""  onSubmit={formik.handleSubmit}>
  <input  value={ formik.values.code} onChange={ formik.handleChange } placeholder='Code'  id='code' name="code" type="text" autoComplete="email-address"  className="px-2 py-3 mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" />
  <button  type='submit' className=' text-[#4FA74F] px-6 py-3 my-5 border border-[#4FA74F] rounded-lg cursor-pointer hover:bg-[#198754] hover:text-white transition-all duration-300'> Verify </button>


  </form>
   
   
   
   
   
   
   
   </>
  )
}
