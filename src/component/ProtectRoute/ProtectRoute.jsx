import React, { useEffect , useState } from 'react'
import { Navigate } from 'react-router-dom'
import style from './ProtectRoute.module.css'

export default function ProtectRoute(props) {

  if ( localStorage.getItem('userToken') !==null ) {

    return props.children
    
  }else{

    return <Navigate to ='/login'/>
  }
    
    
  return (
    <div>ProtectRoute</div>
  )
}
