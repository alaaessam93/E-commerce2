import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';

export default function AllOrders() {

 const [userOrders , setUserOrders ] = useState(null);

useEffect(() => {
  
    const res = jwtDecode(localStorage.getItem('token'));
    // setUserId(res.id);
    getUserOrders(res.id);
    console.log(res);
  
}, [])

async function getUserOrders (userId){

  try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    setUserOrders(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }

}

if (userOrders === null ){

  return <div className='d-flex align-items-center justify-content-center'>
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
  return <>
  
  
    <div className="container  w-75">
      <div className="row gy-2 ">

        {userOrders.map( (order , idx)=>{
          console.log(order.cartItems);
          return <div key={idx} className="col-md-6 bg-dark-subtle border border-3">

          <div>
              <h3>Order no: {idx+1}</h3>
              <h5>Payment Method: {order.paymentMethodType} </h5>
              <h5>Cart Items: {order.cartItems.length} </h5>
              <h5>Total Order Price: {order.totalOrderPrice} EGP</h5>
              <h5>Is Paid: {order.isPaid? "Paid" : "Not Paid Yet"}</h5>
              <div className="row">
                {order.cartItems?.map( (item , index )=> {
                  return <div key={index} className="col-md-3">
                  <img className='w-100 rounded-2' src={item.product.imageCover} alt="item photo" />
                  <h6>count: {item.count}</h6>
                  <h6>{item.product.title.split( " ").slice(0,2).join(" ")}</h6>
                  
                </div>
                })}
              </div>

          </div>
        </div>

        } )}
      </div>


    </div>
  
  
  
  
  </>
}
