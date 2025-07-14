import React, { useEffect , useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import style from './Products.module.css'
import {Helmet} from "react-helmet";


export default function Products() {
  
    
  return <>
  <Helmet>
      <title>Products</title>
     </Helmet>

  <RecentProducts/>
  </>
}
