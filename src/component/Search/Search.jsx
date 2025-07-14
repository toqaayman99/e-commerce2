import React, { useEffect , useState } from 'react'
import style from './Search.module.css'

export default function Search({ searchTerm, onSearch }) {


  return <>
  <div className='flex justify-center items-center'>
  <input id="search" name="search" className=" my-10 w-1/2 md:1/3  lg:w-full  justify-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3  placeholder-gray-500 focus:border-[#C2DBFE] focus:outline-none focus:ring-2 focus:ring-[#C2DBFE] sm:text-sm" placeholder="Search..." type="search"  value={searchTerm}  onChange={(e) => onSearch(e.target.value)} />

  </div>


  
  
  </>
}
