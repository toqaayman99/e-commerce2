import axios from 'axios'
import React, { useEffect , useState } from 'react'
import Spinner from '../Spinner/Spinner'
import style from './Categories.module.css'
import {Helmet} from "react-helmet";


export default function Categories() {
    const [ allCategory , setallCategory] = useState(null)
    const [subCategory, setsubCategory] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");



    function getAllCategory(){

      axios.get('https://ecommerce.routemisr.com/api/v1/categories').then(({data})=>{
       setallCategory(data?.data)
       console.log(data);
     }).catch((error)=>{
       console.log(error);
     })
   }

   function getSpecificCategory(categoryId){
    const category = allCategory.find((cat) => cat._id === categoryId);
    if (category) setSelectedCategoryName(category.name);
  
     axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`).then((response)=>{
       console.log(response);
       setsubCategory(response?.data?.data);
     }).catch((error)=>{
      console.log(error);
     })
   }
console.log(subCategory);

    useEffect( () => {
      getAllCategory()

    }, [])
  
    
    
  return (
    <>
    <Helmet>
      <title>Category</title>
     </Helmet>

{allCategory?.length > 0 ?  <div className="flex flex-wrap gap-y-3 mt-5 ">
{allCategory?.map((cat)=>{ return <div key={cat._id} className="w-full gap-x-10 lg:w-1/2 xl:w-1/3">
   <div onClick={() => getSpecificCategory(cat._id)} className="category cursor-pointer p-5 m-2 border border-gray-200 rounded-lg hover:outline-none  hover:shadow-md hover:shadow-[#47b876]  transition-all duration-300  ">
  
    <img src={cat.image} alt=""  className='w-full h-[300px]' />
    <h2 className='text-[#198754] text-center text-3xl font-medium py-3 '> {cat.name} </h2>

   </div>


 </div>

})}

</div> : <Spinner/> }

{subCategory.length > 0 && (
  <div >
    <h1 className='text-center text-[#4FA74F] text-3xl font-semibold'> {selectedCategoryName} subcategories </h1>
   <div className=" p-4 flex flex-wrap gap-y-3  ">
   {subCategory?.map((sub)=>{ return <div className='mt-10 p-5 border border-gray-300 rounded w-full md:w-1/2 lg:w-1/3 hover:outline-none  hover:shadow-md hover:shadow-[#47b876]  transition-all duration-300 '>    
     <h3 className='text-black font-semibold text-2xl text-center  '>  {sub.name} </h3>
      </div>
    })}

   </div>
    
  </div>
)}

    
    
    
    </>
  )
}
