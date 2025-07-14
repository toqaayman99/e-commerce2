import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar/Navbar'
import {RouterProvider , createBrowserRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Cart from './component/Cart/Cart'
import Brands from './component/Brands/Brands'
import Categories from './component/Categories/Categories'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Products from './component/Products/Products'
import Notfound from './component/Notfound/Notfound'
import UserContextProvider from '../src/Context/UserContext'
import ProtectRoute from './component/ProtectRoute/ProtectRoute'
import Productdetails from './component/Productdetails/Productdetails'
import CartContextProvider  from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './component/CheckOut/CheckOut'
import Wishlist from './component/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import ForgetPassword from './component/ForgetPassword/ForgetPassword'
import VerifyCode from './component/VerifyCode/VerifyCode'
import ResetPassword from './component/ResetPassword/ResetPassword'

function App() {
  const [count, setCount] = useState(0)


  let route = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[
      {index:true , element: <ProtectRoute><Home/></ProtectRoute> },
      {path:'cart' , element: <ProtectRoute><Cart/></ProtectRoute> },
      {path:'/checkout' , element: <ProtectRoute><CheckOut/></ProtectRoute> },
      {path:'brands',element:  <ProtectRoute><Brands/></ProtectRoute>},
      {path:'wishlist',element:  <ProtectRoute><Wishlist/></ProtectRoute>},
      {path:'categories' , element: <ProtectRoute> <Categories/></ProtectRoute>},
      {path:'products' , element: <ProtectRoute><Products/></ProtectRoute> },
      {path:'productdetails/:id' , element: <ProtectRoute><Productdetails/></ProtectRoute> },
      {path:'register' , element: <Register/>},
      {path:'login' , element: <Login/>},
      {path:'forgetpassword' , element: <ForgetPassword/> },
      {path:'/verifycode' , element: <VerifyCode/> },
      {path:'/resetpassword' , element: <ResetPassword/> },
      {path:'*' , element: <Notfound/>},
    ]}
  ])



  return (
    <>

    <UserContextProvider>
     <WishlistContextProvider>
     <CartContextProvider>
      <RouterProvider router={route}> </RouterProvider>
      <Toaster/>
      </CartContextProvider>
     </WishlistContextProvider>

     
    </UserContextProvider>

    </>
  )
}

export default App
