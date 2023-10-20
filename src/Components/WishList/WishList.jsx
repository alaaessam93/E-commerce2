import React from 'react'
import { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function WishList() {



   const {userWishList , addProductToCart , getWishList} = useContext(cartContext);

   console.log(userWishList);

   async function getSpecificProduct (id){

    const res = await addProductToCart(id)
    if (res.status === "success"){

      toast.success(res.message)
    }else{
      toast.error("Try Again")
    }
    
 }


 async function deleteWishListItem (productId){
  
    try {
       const {data}  = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
        headers: {
            token: localStorage.getItem("token")
        }
       })

       getWishList()
       toast.success('item removed succeffully')

    } catch (error) {
        console.log(error);
    }

}

    if(userWishList === null){
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
        <div className="container py-4">
            <h1>My wish List:</h1>
            {userWishList?.data.map( function (product , idx){
                
                return <div key={idx} className="row border-bottom py-5 align-items-center">
                <div className="col-md-3 px-5">
                    <img src={product.imageCover} className='w-100' alt="product photo" />
                </div>
                <div className="col-md-7">
                    <h4>{product.title.split(' ').slice(0,2).join(' ')}</h4>
                    <p className='main-color'>price: {product.price} EGP </p>
                    <button onClick={function(){deleteWishListItem(product.id)}}  className='btn btn-outline-danger'> <i className="fa-solid fa-trash"></i> Remove</button>

                </div>
                <div className="col-md-2">
                    <button onClick={function(){getSpecificProduct(product.id)}} className='btn btn-outline-success py-2 px-3'>Add To Cart</button>
                </div>
            </div>
            })}
        </div>
  </>
}
