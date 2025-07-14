import axios from 'axios'
import React, { useEffect , useState } from 'react'
import Slider from "react-slick";
import style from './CategorySlider.module.css'

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 6,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    const [ categorySlider , setcategorySlider] = useState(null)

    function getCategorySlider(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
        setcategorySlider(data?.data)

      }).catch((error)=>{
        console.log(error);

      })
    }

    useEffect( () => {
      getCategorySlider()
    }, [])
    
  return (
  <>
  
  <Slider {...settings}>
    {categorySlider?.map((category)=>{ return <div className='my-5 w-full'>
      <img className=' h-[250px]' src={category?.image} alt={category?.name} /> 
      <h2 className='text-xl font-semibold'>{category.name}</h2>
    </div>

    })}
    
    
  </Slider>

  </>

  )
}
