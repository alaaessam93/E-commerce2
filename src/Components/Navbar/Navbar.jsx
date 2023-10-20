import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { authContext } from '../../context/authentication'
import { cartContext } from '../../context/CartContext'

export default function Navbar() {
 
  const {numOfCartItems , userWishList , wishListCount} = useContext(cartContext);
   
  const {token , setToken} = useContext(authContext);

   const navigate =  useNavigate()


  function logout(){

    localStorage.removeItem('token');

    setToken(null);

    navigate('/signin')

  }

  return<>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container py-2">
    <Link className="navbar-brand" >
      <img src={logo} alt="logo photo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/brands'>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to='/Cart'>Cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfCartItems}
  </span> </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to='/wishlist'>Wish List<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {wishListCount}
  </span> </Link>
        </li>
        </> : ''}
       
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center ">
      <li className="nav-item ">
          
          <i className='fa-brands fa-facebook-f me-2'></i>
          <i className='fa-brands fa-instagram me-2'></i>
          <i className='fa-brands fa-twitter me-2'></i>
          <i className='fa-brands fa-youtube me-2'></i>
        </li>
        
        {token? <>
          <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      
        <li className="nav-item">
          <span onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>Lougout</span>
        </li>
        
        </> : <>
        
        <li className="nav-item">
          <Link className="nav-link" to='/signin'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/signup'>Register</Link>
        </li>
        </>}
        
       
      </ul>
     
    </div>
  </div>
</nav>
  
  </>
}
