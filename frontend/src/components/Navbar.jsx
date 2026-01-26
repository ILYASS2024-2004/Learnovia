import React from 'react'
import { Link } from "react-router-dom";

import useAuthStore from '../store/useAuthStore';
import './Navbar.css'
import { ArrowRight, LogOut } from 'lucide-react';
import DropDownS from './DropDownS';
import { useThemeStore } from '../store/useThemeStore';
const Navbar = () => {

  const { isAuthenticated,logout} = useAuthStore();
  const {theme}=useThemeStore();
  return (
    <>
     <div className={`hidden sm:flex justify-between items-center p-2 bg-base-100 w-full fixed top-0 z-999 `}>
      <div className='logo text-2xl'>
        LearNovia
      </div>
      <div className='flex items-center gap-4'>
        <Link  to="/">
        <span  className='nvlink'>Accueil
        </span>
        
        </Link>
        <Link  to="/dashboard" className='nvlink'>
        <span>Dashboard
        </span>
        
        </Link>
        <DropDownS className="size-5 "></DropDownS>
        {
          !isAuthenticated && <Link to="/login" className='joinus'>
            <div className={`flex  gap-1 items-center btn ${theme=='light'?'bg-black':'bg-white'}  text-base-100 rounded-full`}> <span className=' text-base-100 '>Rejoignez-nous </span><ArrowRight size={18} />

            </div>
       
       
        

        </Link>
        }
        { isAuthenticated && <div className={`flex nvlink gap-1 items-center btn ${theme=='light'?'bg-black':'bg-white'}   text-base-100 rounded-full`} onClick={logout}>
          <span className='text-base-100 p-0'>Déconnexion</span><LogOut size={18} /></div>
        }
        
       
      
      </div>

    </div>





    <div className="sm:hidden navbar bg-base-100 shadow-sm fixed top-0 z-999990 hgt">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link  to="/">
        <span  className='nvlink'>Accueil
        </span>
        
        </Link></li>
        <li><Link  to="/dashboard" className='nvlink'>
        <span>Dashboard
        </span>
        
        </Link></li>
        <li>{
          !isAuthenticated && <Link to="/login" className='joinus'>
            <div className={`flex gap-1 items-center btn ${theme=='light'?'bg-black':'bg-white'}  text-base-100 rounded-full`}> <span className=' text-base-100 '>Rejoignez-nous </span><ArrowRight size={18} />

            </div>
       
       
        

        </Link>
        }
        { isAuthenticated && <div className={`flex gap-1 items-center btn ${theme=='light'?'bg-black':'bg-white'}  text-base-100 rounded-full`} onClick={logout}>Déconnexion <LogOut size={18} /></div>
        }</li>
      </ul>
    </div>
  </div>
  <div className=" navbar-center  ">
     <div className='logo text-2xl'>
        LearNovia
      </div>
  </div>
  <div className="navbar-end">
    <DropDownS className="size-5"></DropDownS>
  </div>
</div>



    
    </>

   
  )
}

export default Navbar