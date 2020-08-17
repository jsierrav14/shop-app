import PRODUCTS from '../../data/data'
import { DELETER_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/product.action';
import Product from '../../models/Product';
const initialState = {
    availableProducts:[],
    userProducts:PRODUCTS.filter(prod=> prod.ownerId === 'u1'),

}

export default (state=initialState, action)=>{
switch(action.type){

    case  SET_PRODUCTS :{
        return {
            availableProducts: action.products,
            userProducts:action.userProducts
        }
    }
    case DELETER_PRODUCT:{
        return{
            ...state,
            userProducts:state.userProducts.filter(product => product.id !=action.pid),
            availableProducts:state.availableProducts.filter(product => product.id !=action.pid), }
       }
    case CREATE_PRODUCT :{
       const newProduct = new Product(
           action.productData.id,
           action.productData.ownerId,
           action.productData.title,
           action.productData.imageUrl,
           action.productData.description,
           action.productData.price,
       )

       return {
           state,
           availableProducts:state.availableProducts.concat(newProduct),
           userProducts:state.userProducts.concat(newProduct)
       }
    }
    case UPDATE_PRODUCT:{

        const  productIndex = state.userProducts.findIndex(prod=>prod.id === action.pid)
        const updateProduct = new Product(
            action.pid,
            state.userProducts[productIndex].ownerId,
            action.productData.title,
            action.productData.imageUrl,
            action.productData.description,
            state.userProducts[productIndex].price)

        const updatedUserProducts=[...state.userProducts];
        updatedUserProducts[productIndex] = updateProduct
        const avalableIndexProduct = state.availableProducts.findIndex(
            prod=> prod.id ===action.pid
        )

        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[avalableIndexProduct] = updateProduct


        return {
            ...state,
            availableProducts:updatedAvailableProducts,
            userProducts:updatedUserProducts
        }

    }
}
    return state;
}