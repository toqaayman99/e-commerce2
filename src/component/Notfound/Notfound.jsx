import React, { useEffect , useState } from 'react'
import style from './Notfound.module.css'

export default function Notfound() {
    const [ counter , setcounter] = useState(0)


    useEffect( () => {

    }, [])
    
  return (
   <>
   <h1 className='text-3xl font-semibold text-center mt-16 '>Page Not Found </h1>
   </>
  )
}
