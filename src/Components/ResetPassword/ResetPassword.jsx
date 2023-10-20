import React, { useContext, useState } from 'react'
import { authContext } from '../../context/authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const [loading , setLoading ] = useState(false);
    const navReset = useNavigate();

    async function verifyCode (values){

        
        setLoading(true)
    
        try{
          const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values)
         if (data.status === 'success'){
    console.log(data);
    toast.success("code reseted successfully ")
          
    
           setTimeout(() => {
            navReset('/NewPassword')
           }, 2000 );
         }
            
        }
        catch (err){
    console.log(err);
    toast.error("please enter valid code")
          
         
    
        }
        setLoading(false)
        
          
       }

    const verifyForm =  useFormik({
        initialValues: {"resetCode": ""},
        onSubmit: verifyCode
        
   
       })
console.log(verifyForm);
  return<>
    <div className="container">
        <h2>reset your account password</h2>
        <form onSubmit={ verifyForm.handleSubmit }>
          

          <label htmlFor="code" className=''>Code:</label>
          <input onBlur={verifyForm.handleBlur} onChange={verifyForm.handleChange} value={verifyForm.values.resetCode} id='code' type="text" placeholder='code' className='form-control mb-2' />
          { verifyForm.touched.resetCode? <div className="alert alert-danger">
            {verifyForm.errors.resetCode}
          </div> : ""}

          
         
          <div className='d-flex justify-content-evenly'>
            
            <button type='submit' disabled={ verifyForm.isValid === false || verifyForm.dirty === false} className="btn btn-success ms-auto">
            
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
