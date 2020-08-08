import React from 'react'
import { View, FlatList, Platform,Text} from 'react-native'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';


const OrderScreen = props => {

    const orders = useSelector(state => state.orders.orders);


    console.log(orders)
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

export default OrderScreen;


