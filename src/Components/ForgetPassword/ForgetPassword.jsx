import React, { useContext, useState } from 'react'
import { authContext } from '../../context/authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    const [errMsg , setErrMsg] = useState(null);
    const [successMsg , setSuccessMsg ] = useState(null);
    const [loading , setLoading ] = useState(false);
    const navReset = useNavigate();


    async function resetPassword (values){

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true)
    
        try{
          const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values)
         if (data.statusMsg === 'success'){
    console.log(data);
    toast.success(data.message)
           setSuccessMsg(data.message)
    
           setTimeout(() => {
            navReset('/ResetPassword')
           }, 2000 );
         }
            
        }
        catch (err){
    console.log(err);
    toast.error("please enter valid email")
          
          setErrMsg(err.response.data.message)
    
        }
        setLoading(false)
        
          
       }

    const forgetForm =  useFormik({
        initialValues: {"email": ""},
        onSubmit: resetPassword,
        validate: function(values){

            const errors = {}
      
            
            if (values.email.includes('@') === false ||values.email.includes('.') === false ){
              errors.email = "Email invalid";
            }
            
           
      
      
            return errors;
      
          }
   
       })
console.log(forgetForm);
  return<>
    <div className="container">
        <h2>please enter your verification Email</h2>
        <form onSubmit={ forgetForm.handleSubmit }>
          

          <label htmlFor="email" className=''>email:</label>
          <input onBlur={forgetForm.handleBlur} onChange={forgetForm.handleChange} value={forgetForm.values.email} id='email' type="email" placeholder='email' className='form-control mb-2' />
          {forgetForm.errors.email && forgetForm.touched.email? <div className="alert alert-danger">
            {forgetForm.errors.email}
          </div> : ""}

          
         
          <div className='d-flex justify-content-evenly'>
            
            <button type='submit' disabled={ forgetForm.isValid === false || forgetForm.dirty === false} className="btn btn-success ms-auto">
            
            {  loading?   <Bars
                height="20"
                width="30"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : "Verify"    }
            
            
            </button>
          </div>
          

          

        </form>
    </div>
  </>
}
