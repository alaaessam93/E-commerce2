import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authentication';

export default function Signin() {

  const [errMsg , setErrMsg] = useState(null);
  const [successMsg , setSuccessMsg ] = useState(null);
  const navigate = useNavigate();
  const [loading , setLoading ] = useState(false);
  const {setToken} =  useContext(authContext)

   
   let user = {
    
    email:"",
    password:""
   

   }
   async function registerNewAccount (values){

    setErrMsg(null);
    setSuccessMsg(null);
    setLoading(true)

    try{
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
     if (data.message === 'success'){

      localStorage.setItem('token' , data.token)
        setToken (data.token);
       setSuccessMsg("Welcome Back")

       setTimeout(() => {
        navigate('/products')
       }, 2000 );
     }
        
    }
    catch (err){
      
      setErrMsg(err.response.data.message)

    }

    setLoading(false)
      
   }

  const formikOBJ =  useFormik({
    initialValues: user,
    onSubmit: registerNewAccount,
    validate: function(values){

      const errors = {}

      
      if (values.email.includes('@') === false ||values.email.includes('.') === false ){
        errors.email = "Email invalid";
      }
      
      if ( values.password.length < 3 ||  values.password.length > 12){
        errors.password = "password must be from 3 to 12 characters ";
      }
     


      return errors;

    }

   })

  return<>
    <div>
      <div className="container w-75 py-5 m-auto">
        
        

      <div className="w-75 m-auto">

      {errMsg? <div className="alert alert-danger">{errMsg}</div> : "" }

      {successMsg? <div className="alert alert-success">{successMsg}</div> : ""}
      
      <h2>Login:</h2>
      <form onSubmit={ formikOBJ.handleSubmit }>
          

          <label htmlFor="email" className=''>email:</label>
          <input onBlur={formikOBJ.handleBlur} onChange={formikOBJ.handleChange} value={formikOBJ.values.email} id='email' type="email" placeholder='email' className='form-control mb-2' />
          {formikOBJ.errors.email && formikOBJ.touched.email? <div className="alert alert-danger">
            {formikOBJ.errors.email}
          </div> : ""}

          <label htmlFor="password" className=''>password:</label>
          <input onBlur={formikOBJ.handleBlur} onChange={formikOBJ.handleChange} value={formikOBJ.values.password} id='password' type="password" placeholder='password' className='form-control mb-2' />
          {formikOBJ.errors.password && formikOBJ.touched.password? <div className="alert alert-danger">
            {formikOBJ.errors.password}
          </div> : ""}

         
          <div className='d-flex justify-content-evenly'>
            <p onClick={function(){navigate("/forgetpassword") }} className='main-color' style={{cursor: "pointer"}}>Forget your Password ?</p>
            <button type='submit' disabled={ formikOBJ.isValid === false || formikOBJ.dirty === false} className="btn btn-success ms-auto">
            
            {  loading?   <Bars
                height="20"
                width="30"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : "Register"    }
            
            
            </button>
          </div>
          

          

        </form>
      </div>
      </div>
    </div>
  </>
}
