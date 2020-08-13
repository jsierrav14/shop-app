import React, { useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import { View, FlatList, Platform, Text, ActivityIndicator,StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders.action'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const OrderScreen = props => {

    const orders = useSelector(state => state.orders.orders);
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    useEffect( () => {
        setIsLoading(true)
         dispatch(ordersActions.fetchOrders()).then(result=>{
              setIsLoading(false)
         })
       
    }, [dispatch])

    if(isLoading){
        return <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }
    return (
        <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => <OrderItem items={itemData.item.items} amount={itemData.item.totalAmount}
            date={itemData.item.date.readableDate} />} />
    )
}
OrderScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Your Cart',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({

    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default OrderScreen;


