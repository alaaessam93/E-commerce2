import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CashPayment() {

const navigate = useNavigate()
  const {cartId, setNumOfCartItems, setTotalCartPrice, setCartProducts} = useContext(cartContext)

   async function confirmCashOrder (){

   const address =  document.querySelector('#address').value;
   const phone =  document.querySelector('#phone').value;
   const details = document.querySelector('#details').value;

    const shippingAddress  = {
        "details": details,
        "phone": phone,
        "city": address
        }


        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , shippingAddress , {
                headers:{token: localStorage.getItem('token')}
            })
            
            if (data.status === "success"){

                toast.success("order has been confirmed")
                setCartProducts([]);
                setNumOfCartItems(0);
                setTotalCartPrice(0);

               setTimeout(() => {
                navigate('/allorders')
               }, 2000);
            
            }else{
                toast.error("try again later")
            }
        } catch (error) {

            console.log(error);
            
        }



   }

   async function confirmCardOrder (){

    const address =  document.querySelector('#address').value;
    const phone =  document.querySelector('#phone').value;
    const details = document.querySelector('#details').value;
 
     const shippingAddress  = {
         "details": details,
         "phone": phone,
         "city": address
         }
 
 
         try {
             const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , shippingAddress , {
                 headers:{token: localStorage.getItem('token')},
                 params:{url: "http://localhost:3000"}
             })
             
             if (data.status === "success"){
 
                 toast.success("order has been confirmed")
                 setCartProducts([]);
                 setNumOfCartItems(0);
                 setTotalCartPrice(0);
 
                 window.open(data.session.url , "_blank");
             }else{
                 toast.error("try again later")
             }
         } catch (error) {
 
             console.log(error);
             
         }
 
 
 
    }





  return <>
            <div className="container w-75 py-5">
                <h2>Cash Order:</h2>
                <form >
                    <label htmlFor="">Address:</label>
                    <input id='address' type="text" placeholder='Address' className='mb-2 form-control' />

                    <label htmlFor="">Phone:</label>
                    <input id='phone' type="tel" placeholder='Phone' className='mb-2 form-control' />


                    <label htmlFor="">Details:</label>
                    <textarea id='details' type="text" placeholder='Details' className='mb-2 form-control' ></textarea>

                    <div className='text-center py-3 d-flex justify-content-evenly'>
                        <button onClick={confirmCashOrder} type='button' className='btn btn-outline-white main-bg-color  '>Confirm Cash Order</button>
                        <button onClick={confirmCardOrder}  type='button' className='btn btn-outline-white main-bg-color  '>Confirm Card Payment Order</button>
                    </div>
                </form>




            </div>
  
  
  
  
  
  
  </>
}
