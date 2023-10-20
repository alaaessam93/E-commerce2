import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [errMsg , setErrMsg] = useState(null);
  const [successMsg , setSuccessMsg ] = useState(null);
  const navigate = useNavigate();
  const [loading , setLoading ] = useState(false);

   
   let user = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""

   }
   async function registerNewAccount (values){

    setErrMsg(null);
    setSuccessMsg(null);
    setLoading(true)

    try{
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
     if (data.message === 'success'){
       setSuccessMsg("Account has created successfully")

       setTimeout(() => {
        navigate('/signin')
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

      if (values.name.length < 4 ){
        errors.name = "name must be more than 4 characters";
      }
      if (values.email.includes('@') === false ||values.email.includes('.') === false ){
        errors.email = "Email invalid";
      }
      if ( ! values.phone.match(/^01[0125][0-9]{8}$/) ){
        errors.phone = "phone must be egyptian number";
      }
      if ( values.password.length < 3 ||  values.password.length > 12){
        errors.password = "password must be from 3 to 12 characters ";
      }
      if ( values.password !== values.rePassword){
        errors.rePassword = "password and repassword doesn't match";
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
      
      <h2>Register Now:</h2>
      <form onSubmit={ formikOBJ.handleSubmit }>
          <label htmlFor="name" className=''>name:</label>
          <input onBlur={formikOBJ.handleBlur} onChange={formikOBJ.handleChange} value={formikOBJ.values.name} id='name' type="text" placeholder='name' className='form-control mb-2' />
          {formikOBJ.errors.name && formikOBJ.touched.name? <div className="alert alert-danger">
            {formikOBJ.errors.name}
          </div> : ""}

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

          <label htmlFor="rePassword" className=''>re Password:</label>
          <input onBlur={formikOBJ.handleBlur} onChange={formikOBJ.handleChange} value={formikOBJ.values.rePassword} id='rePassword' type="password" placeholder='rePassword' className='form-control mb-2' />
          {formikOBJ.errors.rePassword && formikOBJ.touched.rePassword? <div className="alert alert-danger">
            {formikOBJ.errors.rePassword}
          </div> : ""}

          <label htmlFor="phone" className=''>phone:</label>
          <input onBlur={formikOBJ.handleBlur} onChange={formikOBJ.handleChange} value={formikOBJ.values.phone} id='phone' type="tel" placeholder='phone' className='form-control mb-2' />
          {formikOBJ.errors.phone && formikOBJ.touched.phone? <div className="alert alert-danger">
            {formikOBJ.errors.phone}
          </div> : ""}

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

          

        </form>
      </div>
      </div>
    </div>
  </>
}
