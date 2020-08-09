import Product from "../../models/Product"
export const DELETER_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = "SET_PRODUCTS"

export const fetchProducts = (productId) => {

     return async dispatch => {

          try {
               const response = await fetch('https://shop-app-api.firebaseio.com/products.json', {
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
                              'u1',
                              data[key].title,
                              data[key].imageUrl,
                              data[key].description,
                              data[key].price))
               }
               dispatch({ type: SET_PRODUCTS, products: loadedProducts })

          } catch (error) {
               throw error
          }


     }
}

export const deleteProduct = productId => {
     return async dispatch => {

          await fetch(`https://shop-app-api.firebaseio.com/products/${productId}.json`, {
               method: 'DELETE',
          })
          dispatch({ type: DELETER_PRODUCT, pid: productId })

     }
}
export const createProduct = (title, description, imageUrl, price) => {

     return async dispatch => {


          console.log('DESC',description)
          const response = await fetch('https://shop-app-api.firebaseio.com/products.json', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                    {
                         title,
                         description,
                         imageUrl,
                         price
                    }
               )
          })

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



     return async dispatch => {

          await fetch(`https://shop-app-api.firebaseio.com/products/${id}.json`, {
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
