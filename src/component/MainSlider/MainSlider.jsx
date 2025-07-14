import React, { useEffect , useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import img1 from '../../assets/images/category1.jpg'
import img2 from '../../assets/images/category2.jpg'
import img3 from '../../assets/images/category3.jpg'
import img4 from '../../assets/images/category4.jpg'
import img5 from '../../assets/images/category5.jpg'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
    const [ counter , setcounter] = useState(0)


    useEffect( () => {

    }, [])
    
  return (
    <div className=' container mx-auto flex flex-wrap my-10 w-1/2 '>
    <div className='w-full md:w-2/4 mb-8 '>
    <Slider {...settings}>
      <img className=' h-[450px]' src={img1} alt="" />
      <img className=' h-[450px]' src={img2} alt="" />
   </Slider>

    </div>


    <div className=' w-full md:w-2/4 '>
      <img className='w-full h-[250px]' src={img4} alt=""  />
      <img className='w-full h-[250px]' src={img5} alt="" />

    </div>
    
    
    
    
    
    
    
    
    
    </div>

)
}
