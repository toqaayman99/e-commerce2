import axios from 'axios'
import React, { useEffect , useState } from 'react'
import Spinner from '../Spinner/Spinner'
import style from './RecentProducts.module.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import {CartContext} from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Search from '../Search/Search'
import { WishlistContext } from '../../Context/WishlistContext'


export default function RecentProducts() {
  let {wishlist , wishlistProdcts , deleteWishlitItem } = useContext(WishlistContext)
  let {addToCart  } = useContext(CartContext)
    const [ allProducts , setallProducts] = useState(null)

    async function addProdToWishlist(prodId){
      let response = await wishlist(prodId)
      console.log(response);
      if (response.data.status === 'success') {
        toast.success(response?.data?.message , {
          duration:5000,
          position:'top-right'
 
        })
      }else{
        toast.error('error')
      }
    }

    async function addProdToCart(prodId){
     let response = await addToCart(prodId)

     if (response.data.status === 'success') {
       toast.success(response?.data?.message , {
         duration:5000,
         position:'top-right'

       })
     }else{
       toast.error('error')
     }
    }

    function getAllProducts(){

      axios.get('https://ecommerce.routemisr.com/api/v1/products').then(({data})=>{
       setallProducts(data?.data)
     }).catch((error)=>{
       console.log(error);
     })
   }


   const [searchTerm, setSearchTerm] = useState('');
   const filteredProducts = allProducts?.filter((prod) =>
   prod.title.toLowerCase().includes(searchTerm.toLowerCase()));



    useEffect( () => {
      getAllProducts()

    }, [])
  
    
  return <>
 
 <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
{filteredProducts?.length > 0 ?  <div className="flex  flex-wrap gap-y-3 ">
{filteredProducts?.map((prod)=>{ return <div key={prod._id} className="w-full  gap-x-10 md:w-1/2 lg:w-1/4">
   <div className="product pb-16 p-5 m-2 rounded-lg hover:outline-none  hover:shadow-md hover:shadow-[#47b876] relative  transition-all duration-300  group ">
    <Link to={`productdetails/${prod.id}`} >
    <img src={prod.imageCover} alt=""  className='w-full' />
     <span className='text-[#5AA63E]'> {prod.category.name} </span>
     <h3 className=' text-base font-medium pt-4 pb-2 '> {prod.title.split(' ').slice(0,2).join(" ")} </h3>
     <div className='flex justify-between '>
       <span className='text-sm'> {prod.price} EGP</span>
       <span> <i className='fas fa-star text-yellow-400'></i> {prod.ratingsAverage} </span>
     </div>
    </Link>
    <div className='flex items-center '>
    <button onClick={()=>{addProdToCart(prod._id)}} className='w-2/3 bg-[#479647] text-white py-2 my-2 rounded-md cursor-pointer  absolute -bottom-48 group-hover:bottom-0 transition-all duration-500 '> + Add  </button>

    </div>
    <div className='float-right ' >
    <i onClick={(()=>{
      const isInWishlist = wishlistProdcts?.some(
        (item) => item._id === prod._id
      );
  
      if (isInWishlist) {
        deleteWishlitItem(prod._id); 
      } else {
        addProdToWishlist(prod._id);
      }
    
    })} className={` fa-solid fa-heart text-2xl pl-4 pt-5 cursor-pointer  ${
      wishlistProdcts?.some((item) => item._id === prod._id)
        ? 'text-red-500'
        : null
    }`} />

    </div>


   </div>


 </div>

})}
 


</div> : <Spinner/> }
  

  
  
  </>
}
