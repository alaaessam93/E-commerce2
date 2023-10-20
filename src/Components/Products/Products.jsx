import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlide/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';


export default function Products() {

 const {addProductToCart , addToWishList} =  useContext(cartContext);

 async function getSpecificProduct (id){

    const res = await addProductToCart(id)
    if (res.status === "success"){

      toast.success(res.message)
    }else{
      toast.error("Try Again")
    }
    
 }



 

   function getAllProducts(){
    
      return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  
  
    }
  const {isError , isFetching , isLoading , data} = useQuery('allProducts' , getAllProducts )


  // const [allProducts,  setAllProducts]  = useState(null)
 
  // async function getAllProducts(){
    
  //   const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');

  //   setAllProducts(data.data);
  //   console.log(allProducts);

  // }

  // useEffect(function(){

  //   getAllProducts()

  // } , [])

  if (isLoading){

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

  return <>

  

  <div className="container py-5 ">
  <div className="row gx-0">

<div className="col-9">
  <HomeSlider/>
</div>


<div className="col-3">
  <img style={{width: "100%" , height: "200px"}} src={require('../../images/grocery-banner-2.jpeg')} alt="grocery photo" />
  <img style={{width: "100%" , height: "200px"}} src={require('../../images/grocery-banner.png')} alt="grocery photo" />
</div>
</div>

<CategorySlider/>

  <div className="row gy-4">
    {data?.data.data.map(function (product , idx){
      console.log(product);
       
       return <div key={idx} className="col-md-2 px-2 ">
       <Link style={{textDecoration: "none" , color: "black"}} to={`/productdetails/${product.id}`}>
       <div>
         <img className='w-100' src={product.imageCover} alt="product photo" />
         <h5>{product.title.split(' ').slice(0 , 2).join(" ")}</h5>
         <h6>{product.category.name}</h6>
         <div className="d-flex justify-content-between">
         <p>{product.price} EGP</p>
         <p><span><i className="fa-solid fa-star main-color" ></i> {product.ratingsAverage} </span></p>
         </div>
       </div>
       </Link>
       <div className=' d-flex justify-content-end'><i onClick={()=>addToWishList(product.id)} style={{cursor: "pointer"}} className="fa-solid fa-heart fa-2x "></i></div>
       <button onClick={()=>getSpecificProduct(product.id)} className='w-100 py-1 rounded rounded-1 main-bg-color border-0'>+ Add to Cart</button>

     </div>
    
    })}
  </div>
</div>
  
  </>
}
