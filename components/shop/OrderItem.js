import React,{useState} from 'react'
import { View, Text, Button, StyleSheet, ColorPropType } from 'react-native'
import CartItem from './CartItem'
import Colors from '../../constants/Colors'

const OrderItem = props => {
    const  [showDetails, setshowDetails] = useState(false)
    return <View style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetails? 'Hide details' :'show details'} onPress={()=>{
            setshowDetails(prevState =>!prevState)
        }}/>
        {showDetails && <View style={styles.detailItems}>
            {props.items.map((cartItem) =><CartItem  key={cartItem.productId} amount={cartItem.sum} quantity={cartItem.quantity} title={cartItem.productTitle} />) }
            
            </View>}

    </View>
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',margin:10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems:{
      width:'100%',  
    }
})

export default OrderItem;