import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

     const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
      };


  return (
    <>
    <div className="row  m-0 p-0">

   <div className='d-flex justify-content-between align-items-center mt-3 px-5'>
   <a href="/tasks" className='logo'>NOTE BOOK</a>
       
       <span><button className='logout' onClick={handleLogout}>Logout</button></span>
   </div>

    </div>
    </>
  )
}

export default Navbar