import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';



export default function Categories() {
  
   
 const [allCategories , setAllCategories] = useState(null)

    async function getAllCategories (){

      try {

        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');

        setAllCategories(data.data)
        
      } catch (error) {

        console.log(error);
        
      }
    }

    useEffect(function(){

      getAllCategories();
    } , [])

    if (allCategories === null){
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
        <div className="row g-4">
          {allCategories.map(function(category , indx){
              console.log(category);
            return <div key={indx} className="col-md-4  text-center px-2 ">
            <div className='text-center rounded rounded-2 border border-1 '>
              <img style={{height: '350px'}} className='w-100 rounded-top-2 ' src={category.image} alt="category photo" />
                <h3 className='main-color py-3'>{category.name}</h3>
            </div>
          </div>
          })}
        </div>
      </div>
  </>
}
