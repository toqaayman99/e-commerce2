import axios from "axios";
import { createContext } from "react";
import React, { useEffect ,  useState } from 'react'


export let WishlistContext = createContext(0)

export default function WishlistContextProvider(props){
    let [wishlistProdcts , setwishlistProdcts] = useState(null)
  
   let token= localStorage.getItem('userToken')

    function wishlist(prodId){
      return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            productId:prodId
        } , {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>{
            setwishlistProdcts(response?.data?.data)
            getUserWishlistItem()

            console.log(response);
            return response

        }).catch((error)=>{
            console.log(error);
            return error
        })
    }


    function getUserWishlistItem(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>{

            setwishlistProdcts(response?.data?.data)
            console.log(response);
            return response

        }).catch((error)=>{
            console.log(error);
            return error
        })
    }

    function deleteWishlitItem(prodId){
     return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}` , {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>{
            getUserWishlistItem()

            setwishlistProdcts(response?.data?.data);
            console.log(response);
             return response
        }).catch((error)=>{
            console.log(error);
            return error
        })
    }
   

    useEffect(()=>{
        if (token) {
            getUserWishlistItem()
        }
    },[token])



    return <WishlistContext.Provider value={{wishlist , wishlistProdcts ,  deleteWishlitItem }}>
        {props.children}
    </WishlistContext.Provider>


}

