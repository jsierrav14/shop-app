import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.action"
import CartItem from "../../models/CartItem";
import { ADD_ORDER } from "../actions/orders.action";
import { DELETER_PRODUCT } from "../actions/product.action";
const initialState = {
    items: {},
    totalAmount: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;  
                      console.log(addedProduct)

            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title


            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]:updatedOrNewCartItem },
                    totalAmount: state.totalAmount + prodPrice
                }
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)

            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            }

        case REMOVE_FROM_CART:
            let updateCartItems;
            const selectCartItem = state.items[action.productId]
            const currentQty = state.items[action.productId].quantity
            if(currentQty > 1){
              const updateCartItem = new CartItem(selectCartItem.quantity-1,
                    selectCartItem.productPrice,
                    selectCartItem.productTitle,
                    selectCartItem.sum - selectCartItem.productPrice);
                updateCartItems ={...state.items, [action.productId]:updateCartItem}
            }else{
                updateCartItems ={...state.items};
                delete updateCartItems[action.productId]
            }

            return {
                ...state,
                items: updateCartItems,
                totalAmount: state.totalAmount - selectCartItem.productPrice
            }

            case ADD_ORDER :{
                 return initialState;
            }

            case DELETER_PRODUCT:
                if(!state.items[action.pid]){
                    return state
                }
                const updateItems = {...state.items};
                const itemTotal = state.items[action.pid].sum
                delete updateItems[action.pid]
               return {
                   ...state,
                   items:updateItems,
                   totalAmount:state.totalAmount - itemTotal
               }


        default:
            return state
    }
}