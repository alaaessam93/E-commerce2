import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext(  );

export  function CartContextProvider ({children}){

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [userWishList, setUserWishList] = useState(null);
    const [wishListCount, setWishListCount] = useState(0);

    async function addProductToCart (productId){

       try {
        const{data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , 
            {
                "productId": productId
            },
            {
              headers:  {token: localStorage.getItem("token")}
            }
        )
        getUserCart()
        // setNumOfCartItems(data.numOfCartItems);
        // setTotalCartPrice(data.data.totalCartPrice);
        // setCartProducts(data.data.products)
            console.log(data);
        return data;
        
       } catch (error) {
         console.log(error);
       }

    }

  async function addToWishList (productID){
try {
   const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
        "productId": productID
    } , {
        headers:{token: localStorage.getItem('token')}
    })

    
    console.log("done");

   

    getWishList()
} catch (error) {
    console.log(error);
   

}

  }


  async function getWishList (){

    try {
        const{data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            headers:{token: localStorage.getItem('token')}
        })
        console.log("wishlist" , data);
        setUserWishList(data)
        setWishListCount(data.count)

    } catch (error) {
        console.log(error);
    }
  }



    async function getUserCart (){

    try {
        const {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
            headers: {token: localStorage.getItem("token")}
        })

        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartId(data.data._id);

        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
    }


    useEffect(function(){

        getUserCart()
        getWishList()
    } , [])


    async function deleteCartItem (productId){
  
        try {
           const {data}  = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers: {
                token: localStorage.getItem("token")
            }
           })

           setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);

        return data;

        } catch (error) {
            console.log(error);
        }
    
    }



    async function updateCount (productId , count){
        try {
          const {data} = await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            "count": count
        }, {
            headers:{token: localStorage.getItem('token')}
        })

        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);

            return data;
        } catch (error) {
            
        }
    }


    async function deleteCart (){

        try {
            const {data} =  await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers: {token: localStorage.getItem("token")}
            })
    
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setCartProducts([]);
    
            
            
        } catch (error) {
            console.log(error);
        }
        }




    return<cartContext.Provider  value={{
addProductToCart,
numOfCartItems,
totalCartPrice,
cartProducts,
getUserCart,
deleteCartItem,
updateCount,
deleteCart,
cartId,
setNumOfCartItems,
setTotalCartPrice,
setCartProducts,
addToWishList,
userWishList,
wishListCount,
getWishList,

    }}>

    
    {children}
    
    
    </cartContext.Provider>

}