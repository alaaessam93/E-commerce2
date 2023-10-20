import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import Categories from './../Categories/Categories';

export default function CategorySlider() {

    function getAllCategories(){

        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

   const {isLoading , data} = useQuery("allCategories" , getAllCategories , {
    refetchOnMount: false
   })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
      };

      if(isLoading){
        return <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      }
  return <>
  
  
  <div className='my-5'>
        <h3>Category Slider</h3>
        <Slider {...settings}>
          
          {data?.data.data.map(function (category , idx){

            return <div key={idx}>
            <img style={{width: "100%" , height: "200px"}} src={category.image} alt="slider photo" />
            <h6 className='my-2'>{category.name}</h6>
          </div>
          })}
        </Slider>
      </div>
  
  </>
}
