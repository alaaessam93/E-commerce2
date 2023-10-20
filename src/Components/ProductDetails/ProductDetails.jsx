import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { ColorRing, ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {


    const [sendingLoader, setsendingLoader] = useState(false)

    const { addProductToCart , addToWishList } = useContext(cartContext);

    async function addSpecificProduct (id){

        setsendingLoader(true);
      const res = await addProductToCart(id)

      if (res.status === "success"){

        toast.success(res.message)
      }else{
        toast.error("Try Again")
      }

      setsendingLoader(false);
      
    }

    const {id} = useParams()

    function getProductDetails (){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    
    const { data , isLoading } = useQuery("prouctDetails" , getProductDetails  );
    // console.log(data);

    if (isLoading) {

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
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <figure>
                            <img className='w-100 h-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                        </figure>
                    </div>

                </div>
                <div className="col-md-8 p-5">
                    <div className='py-5'>
                        <h5>{data.data.data.description}</h5>
                        <p className="text-muted">{data.data.data.title} </p>
                        <h6>{data.data.data.category.name}</h6>
                        <div className="d-flex justify-content-between">
                             <p>Price : {data.data.data.price} EGP</p>
                             <p><span><i className="fa-solid fa-star main-color" ></i> {data.data.data.ratingsAverage} </span></p>
                             <div className=' d-flex justify-content-end'><i onClick={()=>addToWishList(data.data.data.id)} style={{cursor: "pointer"}} className="fa-solid fa-heart fa-2x "></i></div>
                             <p>{data.data.data.id}</p>
                        </div>

                        <button onClick={()=> addSpecificProduct(data.data.data.id) } className=' w-100 text-white rounded-2 main-bg-color border-0 py-2 '>
                            {sendingLoader? <div className='text-center'>
                                <ThreeDots 
height="30" 
width="50" 
radius="9"
color="#fff" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName="text-center"
visible={true}
 />
                            </div> : "+ Add To Cart" }
                            
                            </button>
                       
                    </div>

                </div>
            </div>
        </div>
    
  
  </>
}
