import Product from "../../models/Product"
export const DELETER_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = "SET_PRODUCTS"

export const fetchProducts = (productId) => {

     return async (dispatch,getState) => {
          const token = getState().auth.token;
          const userId = getState().auth.userId;

          try {
               const response = await fetch(`https://shop-app-api.firebaseio.com/products.json?auth=${token}`, {
                    method: 'GET',

               })

               if (!response.ok) {
                    throw new Error('Somenting was wrong')
               }

               const data = await response.json();
               const loadedProducts = [];

               for (const key in data) {
                    loadedProducts.push(
                         new Product(
                              key,
                              userId,
                              data[key].title,
                              data[key].imageUrl,
                              data[key].description,
                              data[key].price))
               }
               dispatch(
                    { type: SET_PRODUCTS, 
                    products: loadedProducts,
                    userProducts:loadedProducts.filter(prod=>prod.ownerId ===userId) }
               )

          } catch (error) {
               throw error
          }


     }
}

export const deleteProduct = productId => {
     return async (dispatch,getState) => {
         
          const token = getState().auth.token;
          const response = await fetch(`https://shop-app-api.firebaseio.com/products/${productId}.json?auth=${token}`, {
               method: 'DELETE',
          })
          if (!response.ok) {
               throw new Error('Somenting was wrong')
          }
          dispatch({ type: DELETER_PRODUCT, pid: productId })

     }
}
export const createProduct = (title, description, imageUrl, price) => {

     return async (dispatch,getState)  => {

          const token = getState().auth.token;
          const userId = getState().auth.userId;
          const response = await fetch(`https://shop-app-api.firebaseio.com/products.json?auth=${token}`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                    {
                         title,
                         description,
                         imageUrl,
                         price,
                         ownerId:userId
                    }
               )
          })

          if (!response.ok) {
               throw new Error('Somenting was wrong')
          }

          const data = await response.json();
          dispatch({
               type: CREATE_PRODUCT,
               productData: {
                    id: data.name,
                    title,
                    description,
                    imageUrl,
                    price
               }

          })

     }
}

export const updateProduct = (id, title, description, imageUrl) => {



     return async (dispatch,getState)  => {
          const token = getState().auth.token;
          const response = await fetch(`https://shop-app-api.firebaseio.com/products/${id}.json?auth=${token}`, {
               method: 'PATCH',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(
                    {
                         title,
                         description,
                         imageUrl
                    }
               )
          })

          if (!response.ok) {
               throw new Error('Somenting was wrong')
          }
          dispatch({
               type: UPDATE_PRODUCT,
               pid: id,
               productData: {
                    title,
                    description,
                    imageUrl
               }
          })
     }

}
