import React, { useEffect , useState } from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import style from './Brands.module.css'
import {Helmet} from "react-helmet";


export default function Brands() {
  const [ allBrands , setallBrands] = useState(null)
  const [selectedBrandDetails, setselectedBrandDetails] = useState(null);
const [showModal, setShowModal] = useState(false);

  function getAllBrands(){

    axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(({data})=>{
     setallBrands(data?.data)
     console.log(data);
   }).catch((error)=>{
     console.log(error);
   })
 }

 function getSpecificBrand(brandId){
   axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`).then(({data})=>{

setselectedBrandDetails(data.data)
setShowModal(true);

    console.log(data);
  }).catch((error)=>{
    console.log(error);
  })
 }

  useEffect( () => {
    getAllBrands()

  }, [])
 

    
  return (
   <>
   <Helmet>
      <title>Brands</title>
     </Helmet>

{allBrands?.length > 0 ? <div><h1 className='text-[#4FA74F] font-medium text-4xl text-center my-8 ' >All Brands </h1> <div className="flex flex-wrap gap-y-3 "> 

{allBrands?.map((brand)=>{ return   <div key={brand._id} className="w-full gap-x-10 md:w-1/2 lg:w-1/3 xl:w-1/4">

  
  <div  onClick={(()=>{
    getSpecificBrand(brand._id)
  })} className="brand cursor-pointer p-5 m-2 border border-gray-200 rounded-lg hover:outline-none  hover:shadow-md hover:shadow-[#47b876]  transition-all duration-300  ">
  
  <img src={brand.image} alt=""  className='w-full' />
  <h2 className=' text-black text-center py-3 '> {brand.name} </h2>

 </div>
  


 </div>

})}
{showModal && selectedBrandDetails && (
  <div className="fixed inset-0 bg-black/30 flex items-start  justify-center z-50">
    <div className="bg-white mt-6 p-6 rounded-lg w-[90%] md:w-[50%] lg:w-[35%] relative shadow-lg">
      <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl cursor-pointer">
        &times;
      </button>
<div>
  <div className='flex justify-between items-center border-gray-200 border-y-2 my-5'>
      <div>
      <h2 className="text-2xl font-bold text-[#4fa74f] mb-4">{selectedBrandDetails.name}</h2>
      <p className="text-gray-600 mt-4"> {selectedBrandDetails.name}</p>
      </div>
     
      <img src={selectedBrandDetails.image} alt={selectedBrandDetails.name} className="w-1/2 h-[150px] object-cover rounded" />

  </div>

  <button onClick={() => setShowModal(false)} className=" text-white bg-gray-500 px-3 py-2 rounded-md float-right cursor-pointer">
      close
      </button>
  
</div>
         </div>
  </div>
)}
 </div> 

</div> : <Spinner/> }
   
   </>
  )
}
