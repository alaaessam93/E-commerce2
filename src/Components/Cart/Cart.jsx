import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
 
    const navigateTo = useNavigate()
     const {numOfCartItems, totalCartPrice, cartProducts , deleteCartItem , updateCount , deleteCart , cartId} = useContext(cartContext);
    
      console.log(cartId);
    if (cartProducts===null){
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

   async function deleteElement (id){
    const res =  await deleteCartItem(id)
    console.log(res);

    if (res.status === "success"){
        toast.success("product removed successfully");
    }else{
        toast.error("Try Again");

    }

    }


    async function updateElement (id , count){

      const res =  await updateCount (id , count)
    

      if (res.status === "success"){
        toast.success("updated")
      }else{
        toast.error('error')
      }
    }


    async function ClearCart (){
      
      const res = await deleteCart ();
      

      if (cartProducts.length === 0) {
        toast.success("cart cleared successfully")

        setTimeout(()=>  {  navigateTo('/products')} , 2000)

      
      }

      // if (res )


    
    }

    

  return <>
  <div className="container w-75 bg-dark-subtle py-3 px-2">
    <h2>Shop Cart:</h2>
    <h4 className='main-color'>Total Cart Price: {totalCartPrice}</h4>
    <h4 className='main-color'>Total Cart Items: {numOfCartItems}</h4>

    {cartProducts?.map((product , idx)=>{ return<>
        <div key={idx} className="row py-1 d-flex align-items-center border-bottom border-1">
        <div  className="col-md-2">
            <div><img className='w-100' src={product.product.imageCover} alt={product.count} /></div>
        </div>
        <div className="col-md-8">
           <div>
           <h5>{product.product.title}</h5>
            <h6>Price: {product.price}  </h6>
            <button onClick={()=> deleteElement (product.product.id)} className='btn btn-outline-danger'> <i className="fa-solid fa-trash"></i> Remove</button>
           </div>
        </div>
        <div className="col-md-2">
           <div>
           <button onClick={()=>updateElement (product.product.id , product.count +1)} className='btn btn-outline-success'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>updateElement (product.product.id , product.count -1)} className='btn btn-outline-success'>-</button>
           </div>
        </div>
    </div> 
    </>  })}


    <div className="text-center py-3 d-flex justify-content-evenly">
    <button onClick={ClearCart} className='btn btn-danger py-2 px-5 '>Clear Cart</button>
    <button onClick={function(){ navigateTo('/cashpayment')}}  className='btn btn-success py-2 px-5 '>Cash CHECKOUT</button>
    </div>
    
  </div>
  
  
  
  
  </>
}
