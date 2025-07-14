import axios from 'axios'
import React, { useEffect , useState } from 'react'
import Spinner from '../Spinner/Spinner'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Search from '../Search/Search'
import {Helmet} from "react-helmet";


export default function Home() {


  
return <>
<Helmet>
      <title>Home</title>
     </Helmet>
<MainSlider/>
<CategorySlider/>

<RecentProducts/>

</>
}
