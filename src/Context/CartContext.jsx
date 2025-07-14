import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let CartContext = createContext(0)


export default function CartContextProvider(props){
    let [cartId , setcartId] = useState(null)
    let [numOfCartItems , setnumOfCartItems] = useState(0)
    let [message , setmessage] = useState(null)
    let [products , setproducts] = useState(null)
    let [totalCartPrice , settotalCartPrice] = useState(0)
    let token =localStorage.getItem('userToken')

    const headers = {
        token: localStorage.getItem("userToken"),
      };

     function resetCart(){
        setcartId(null)
        setnumOfCartItems(0)
        setproducts(null)
        settotalCartPrice(0)

     }
     function addToCart(prodId){
         
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId:prodId
        } , {
            headers

        }).then((response)=>{
            getUserCartItem()
            return (response);
          
            
        }).catch((error)=>{
          return (error);
        })
    }
   
    function getUserCartItem(){
        axios.get('https://ecommerce.routemisr.com/api/v1/cart' , { headers}).then((response)=>{
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setmessage(response?.data?.message)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }

  
    function deleteCartItem(prodId ){
      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` ,  {
            headers

        }).then((response)=>{
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setmessage(response?.data?.message)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
             return response
        }).catch((error)=>{
            return error
        })
    }
    function deleteCart( ){
      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,  {
            headers

        }).then((response)=>{
            setcartId(0);
            setnumOfCartItems(0);
            setmessage(response?.data?.message);
            setproducts([]);
            settotalCartPrice(0);        
             return response
        }).catch((error)=>{
            return error
        })
    }
   
    function updateCart(prodId , count){
      return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` , {
            count:count
        } , {
            headers

        }).then((response)=>{
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setmessage(response?.data?.message)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
             return response
        }).catch((error)=>{
            return error
        })
    }

    useEffect(()=>{
        if (token) {
            getUserCartItem()
        }
    },[token])


   return <CartContext.Provider value={{addToCart  , updateCart , deleteCartItem , deleteCart , resetCart , cartId , numOfCartItems , message , products , totalCartPrice }}>
       {props.children}

    </CartContext.Provider>

}