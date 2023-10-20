import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Signin from './Components/Signin/Signin'
import Signup from './Components/Signup/Signup'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import Brands from './Components/Brands/Brands'
import Profile from './Components/Profile/Profile'
import { AuthProvider } from './context/authentication'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { CartContextProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/Cart/Cart'
import CashPayment from './Components/CashPayment/CashPayment'
import AllOrders from './Components/AllOrders/AllOrders'
import { Offline } from 'react-detect-offline'
import { BoxShadow } from 'react-shadow';
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import NewPassword from './Components/ResetPassword/NewPassword/NewPassword'




const router = createHashRouter([
  { path: "/" , element: <Layout/>, children: [

    {index: true , element: <ProtectedRoute> <Products/> </ProtectedRoute>  },
    {path: "products" , element: <ProtectedRoute> <Products/> </ProtectedRoute> },
    {path: "Signin" , element: <Signin/> },
    {path: "Signup" , element: <Signup/> },
    {path: "forgetpassword" , element: <ForgetPassword/> },
    {path: "ResetPassword" , element: <ResetPassword/> },
    {path: "NewPassword" , element: <NewPassword/> },
    {path: "categories" , element: <ProtectedRoute> <Categories/> </ProtectedRoute> },
    {path: "profile" , element: <ProtectedRoute> <Profile/> </ProtectedRoute> },
    {path: "brands" , element: <ProtectedRoute> <Brands/> </ProtectedRoute> },
    {path: "productdetails/:id" , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute> },
    {path: "cashPayment" , element: <ProtectedRoute> <CashPayment/> </ProtectedRoute> },
    {path: "wishlist" , element: <ProtectedRoute> <WishList/> </ProtectedRoute> },
    {path: "allorders" , element: <ProtectedRoute> <AllOrders/> </ProtectedRoute> },
    {path: "cart" , element: <ProtectedRoute> <Cart/> </ProtectedRoute> },
    {path: "*" , element: <NotFound/> }
    

  ] }
])


export default function App() {

  let queryClient = new QueryClient();

  return <>
  
  <QueryClientProvider client={queryClient}>
   <CartContextProvider>

   <AuthProvider>
        <RouterProvider router={router}  />
   </AuthProvider>

   </CartContextProvider>
  
 
  <Toaster/>
   </QueryClientProvider>

   <Offline>

      <div className=' position-fixed bottom-0 start-0 main-bg-color  p-5 rounded-3 text-white'>

          You are offline now, try to Connect

      </div>
   </Offline>
  </>
}
