import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart.action'
import * as  orderActions from '../../store/actions/orders.action'
const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })


        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    })
    const dispatch = useDispatch();

    const sendOrder = async () => {
        setIsLoading(true)
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }


    return <View style={styles.screen}>

        <View style={styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>
                    ${Math.round((cartTotalAmount.toFixed(2) * 100) / 10)}
                </Text>
            </Text>
            {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> :
                <Button
                    title="Order Now"
                    color={Colors.accent}
                    disabled={cartItems.length === 0} onPress={sendOrder} />
                }
        </View>

        <FlatList
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData =>
                <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    deletable
                    amount={itemData.item.sum}
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.productId))
                    }} />} />
    </View>
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        backgroundColor: 'white',
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
})

export default CartScreen;