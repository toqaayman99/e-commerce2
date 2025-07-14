import React, { useEffect , useState } from 'react'
import { Circles } from 'react-loader-spinner'
import style from './Spinner.module.css'

export default function Spinner() {
    const [ counter , setcounter] = useState(0)


    useEffect( () => {

    }, [])
    
  return (
   <>
   <div className='h-screen flex justify-center items-center '> 
   <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />

   </div>
   
   </>
  )
}
