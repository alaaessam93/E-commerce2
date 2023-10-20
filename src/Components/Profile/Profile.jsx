import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
 
  const [name, setName] = useState(null)

  const navigate = useNavigate()

  useEffect(function(){

    const data = jwtDecode(localStorage.getItem('token'))

    setName(data.name);

  } , [])  

  function myOrders (){
    navigate('/allorders')
  }

  if (name === null){
    return <div className="vh-100 d-flex justify-content-center align-items-center">

    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
  }
  return<>


  <div className="container w-75">
  <div className="text-center py-5">

<h1>hello ya {name}</h1>
 </div>

<div className='text-center'>
 <button onClick={myOrders} className='btn  w-75 main-bg-color'>My Orders</button>
</div>

  </div>
  
  
  
  </>
}
