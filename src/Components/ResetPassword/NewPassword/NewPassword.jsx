// import axios from 'axios'
// import { useFormik } from 'formik'
// import React, { useContext, useState } from 'react'
// import { Bars } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
// import { authContext } from '../../context/authentication';

// export default function NewPassword() {

//   const [errMsg , setErrMsg] = useState(null);
//   const [successMsg , setSuccessMsg ] = useState(null);
//   const navigate = useNavigate();
//   const [loading , setLoading ] = useState(false);


   
//    let user = {
    
//     email:"",
//     newPassword:""
   

//    }
//    async function newPassword (values){

//     setErrMsg(null);
//     setSuccessMsg(null);
//     setLoading(true)

//     try{
//       const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , values)
//      if (data.message === 'success'){

//        setSuccessMsg("Welcome Back")

//     //    setTimeout(() => {
//     //     navigate('/products')
//     //    }, 2000 );
//      }
        
//     }
//     catch (err){
      
//       setErrMsg(err.response.data.message)

//     }

//     setLoading(false)
      
//    }

//   const newPassForm =  useFormik({
//     initialValues: user,
//     onSubmit: newPassword,
//     validate: function(values){

//       const errors = {}

      
//       if (values.email.includes('@') === false ||values.email.includes('.') === false ){
//         errors.email = "Email invalid";
//       }
      
//       if ( values.newPassword.length < 3 ||  values.newPassword.length > 12){
//         errors.newPassword = "password must be from 3 to 12 characters ";
//       }
     


//       return errors;

//     }

//    })

//   return<>
//     <div>
//       <div className="container w-75 py-5 m-auto">
        
        

//       <div className="w-75 m-auto">

//       {errMsg? <div className="alert alert-danger">{errMsg}</div> : "" }

//       {successMsg? <div className="alert alert-success">{successMsg}</div> : ""}
      
//       <h2>Login:</h2>
//       <form onSubmit={ newPassForm.handleSubmit }>
          

//           <label htmlFor="email" className=''>email:</label>
//           <input onBlur={newPassForm.handleBlur} onChange={newPassForm.handleChange} value={newPassForm.values.email} id='email' type="email" placeholder='email' className='form-control mb-2' />
//           {newPassForm.errors.email && newPassForm.touched.email? <div className="alert alert-danger">
//             {newPassForm.errors.email}
//           </div> : ""}

//           <label htmlFor="password" className=''>newPassword:</label>
//           <input onBlur={newPassForm.handleBlur} onChange={newPassForm.handleChange} value={newPassForm.values.password} id='password' type="password" placeholder='password' className='form-control mb-2' />
//           {newPassForm.errors.newPassword && newPassForm.touched.newPassword? <div className="alert alert-danger">
//             {newPassForm.errors.newPassword}
//           </div> : ""}

         
//           <div className='d-flex justify-content-evenly'>
//             <p onClick={function(){navigate("/forgetpassword") }} className='main-color' style={{cursor: "pointer"}}>Forget your Password ?</p>
//             <button type='submit' disabled={ newPassForm.isValid === false || newPassForm.dirty === false} className="btn btn-success ms-auto">
            
//             {  loading?   <Bars
//                 height="20"
//                 width="30"
//                 color="#fff"
//                 ariaLabel="bars-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//                 visible={true}
//               /> : "Register"    }
            
            
//             </button>
//           </div>
          

          

//         </form>
//       </div>
//       </div>
//     </div>
//   </>
// }
