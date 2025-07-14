import React from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'
import { CartContext } from '../Context/CartContext'
import { UserContext } from '../Context/userContext'
import {  useState } from 'react'


export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
let navigate = useNavigate()

  function logout(){
    localStorage.removeItem('userToken')
    setuserLogin(null)
    navigate('/login')

  }

  let {numOfCartItems} = useContext(CartContext)
  let { userLogin , setuserLogin} = useContext(UserContext)

  
  return  (
  <>

  <nav className=' bg-[#F8F9FA] p-2 fixed top-0 right-0 left-0 z-50'>
    
    <div className="container max-w-[1400px] m-auto flex  md:flex-row justify-between items-center">

      <div className=' flex  items-center ml-14 md:flex-row '>
      <i className="fa-solid fa-cart-shopping text-[#4FA74F] text-3xl"></i>
      <h1 className='text-3xl font-medium ' >Fresh Cart</h1>
      </div>

      <div >
        
        <ul className=' hidden lg:flex items-center justify-center  md:flex-row'>
          {userLogin !== null ? <>
          <li><NavLink to="/" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Home</NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Cart</NavLink></li>
          <li><NavLink to="/wishlist" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Wish list</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Products</NavLink></li>
          <li><NavLink to="/categories" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Categories</NavLink></li>
          <li><NavLink to="/brands" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Brands</NavLink></li>
          

          </> : null  }
          
        </ul>

      </div>


      <div className='hidden lg:flex  flex-col items-center md:flex-row  '>
    
        <ul className='hidden lg:flex  flex-col items-center md:flex-row  '>
        {userLogin===null ? <>  <li className=' p-2  text-slate-800'> <NavLink to='/login'> Login</NavLink>  </li>
          <li className=' p-2  text-slate-800'> <NavLink to='/register'> Register</NavLink>  </li></> :   
        <div className='flex items-center '>

        <button type="button" className="relative inline-flex items-center p-3 cursor-pointer   ">
  <i className="fa-solid fa-cart-shopping text-gray-600 text-3xl hover:text-gray-700 transition-all duration-200" />
  <span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#4FA74F] rounded-md -top-0 -end-0 ">{numOfCartItems}</div>
</button>


           <li onClick={logout} className=' p-2  text-slate-800 cursor-pointer'> <a href='' >Log out</a>  </li>
        </div>
 }
        
        </ul>
      </div>


      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-700 text-3xl px-4 cursor-pointer">
       <i className="fa-solid fa-bars"></i>
      </button>

    </div>



  </nav>


  {isSidebarOpen && (
        <>

          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsSidebarOpen(false)}></div>


          <div className="fixed   top-0 left-0 right-0 h-3/4  bg-white z-50 p-5 shadow-lg transition-transform animate-slide-in">
          <div className="head flex justify-between">
          <div className=' flex  items-center ml-14 md:flex-row '>
           <i className="fa-solid fa-cart-shopping text-[#4FA74F] text-3xl"></i>
           <h1 className='text-3xl font-medium ' >Fresh Cart</h1>
          </div>

          <button  onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-700 text-3xl px-4 cursor-pointer">
            <i className="fa-solid fa-bars"></i>
          </button>
          </div>

            <ul className="flex flex-col gap-4 text-slate-700 font-medium">
            {userLogin !== null ? <>
          <li><NavLink to="/" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Home</NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Cart</NavLink></li>
          <li><NavLink to="/wishlist" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Wish list</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Products</NavLink></li>
          <li><NavLink to="/categories" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Categories</NavLink></li>
          <li><NavLink to="/brands" className={({ isActive }) => `text-md p-2 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>Brands</NavLink></li>
          

          </> : null  }
             
            </ul>
            
            <ul className="flex flex-col justify-center items-center pt-11 gap-4 text-slate-700 font-medium">
       
            {userLogin===null ? <>  <li className=' p-2  text-slate-800'> <NavLink to='/login'> Login</NavLink>  </li>
            <li className=' p-2  text-slate-800'> <NavLink to='/register'> Register</NavLink>  </li></> : 

        <div className='flex items-center '>

           <button type="button" className="relative inline-flex items-center p-3 cursor-pointer   ">
            <i className="fa-solid fa-cart-shopping text-gray-600 text-3xl hover:text-gray-700 transition-all duration-200" />
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#4FA74F] rounded-md -top-0 -end-0 ">{numOfCartItems}</div>
           </button>

           <li onClick={logout} className=' p-2  text-slate-800 cursor-pointer'> <a href='' >Log out</a>  </li>
        </div>
 }

            </ul>


          </div>
        </>
      )}

  
  
  
  
  
  
  
  
  </>
  )
}
