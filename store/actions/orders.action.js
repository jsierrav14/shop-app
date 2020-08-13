import Order from "../../models/Order"
export const ADD_ORDER ='ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () =>{

    return async dispatch =>{
   
        try {
            const response = await fetch('https://shop-app-api.firebaseio.com/orders/u1.json', {
                 method: 'GET',

            })

            if (!response.ok) {
                 throw new Error('Somenting was wrong')
            }

            const data = await response.json();
            const loadedOrders = [];

            for (const key in data) {
                 loadedOrders.push(
                      new Order(
                       key,
                        data[key].cartItems,
                        data[key].totalAmount,
                        new Date(data[key].date)
                      )
                      )
            }
            dispatch({type:SET_ORDERS, orders:loadedOrders})
       } catch (error) {
            throw error
       }

    

    }
}

export const addOrder = (cartItems, totalAmount) =>{
    return async dispatch =>{

        const date = new Date().toString();
        const response = await fetch('https://shop-app-api.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                 {
                     cartItems,
                     totalAmount,
                     date:date
                      
                 }
            )
       })

       const data = await response.json();


       if (!response.ok) {
            throw new Error('Somenting was wrong')
       }
        dispatch(
            {type:ADD_ORDER,orderData:{id:data.name,items:cartItems, amount:totalAmount,date:date}}
        )


    }
}