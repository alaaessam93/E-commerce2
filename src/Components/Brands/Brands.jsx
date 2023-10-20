import axios from 'axios'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Brands() {
  // const [allBrands , setAllBrands] =useState(null)

  function isHover(){
    document.querySelector('.is-hover').style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  }
  function isNotHover(){
    document.querySelector('.is-hover').style.boxShadow = 'none';
  }
  // document.querySelector('.is-hover').addEventListener('mouseover', () => {
  //   document.querySelector('.is-hover').style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  // });
  // document.querySelector('.is-hover').addEventListener('mouseout', () => {
  //   document.querySelector('.is-hover').style.boxShadow = 'none';
  // });

  function getAllBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const {data , isLoading} = useQuery('AllBrands' , getAllBrands);
  


  if(isLoading){
    <div className="vh-100 d-flex justify-content-center align-items-center">

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
  return<><div className="container py-5 text-center">
    <h1 className='main-color'>All Brands</h1>

    <div className="row">
      {data?.data.data.map( function(brand , idx){
        return <div onMouseOver={isHover} onMouseOut={isNotHover} key={idx} className="col-md-3 px-2 py-2 is-hover">
        <div  className='border border-1 '>
          <img className='w-100' style={{height: "200px"}} src={brand.image} alt="brand photo" />
          <p className='py-3'>{brand.name}</p>
        </div>
      </div>
      }  )}
    </div>
  </div>
  </>
}
