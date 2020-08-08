import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import {Ionicons} from '@expo/vector-icons'
import  UserProductsScreen  from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

const defaultNavigation = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColot: Platform.OS === 'android' ? 'white' : Colors.primary
}
const ProductsNavigator = createStackNavigator({

    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

}, {
    navigationOptions:{
        drawerIcon: drawerConfig =>
        (<Ionicons 
        name={Platform.OS ==='android' ?'md-cart' :'ios-cart'}
         size={23} color={drawerConfig.tintColor}/>
        )
     },
    defaultNavigationOptions:defaultNavigation
})

const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen,

}, {
    navigationOptions:{
        drawerIcon: drawerConfig =>
        (<Ionicons 
        name={Platform.OS ==='android' ?'md-list' :'ios-list'}
         size={23} color={drawerConfig.tintColor}/>
        )
     },
    defaultNavigationOptions:defaultNavigation
})

const UsersNavigator = createStackNavigator({

   Admin:UserProductsScreen,
   EditProduct:EditProductScreen

}, {
    navigationOptions:{
        drawerIcon: drawerConfig =>
        (<Ionicons 
        name={Platform.OS ==='android' ?'md-create' :'ios-create'}
         size={23} color={drawerConfig.tintColor}/>
        )
     },
    defaultNavigationOptions:defaultNavigation
})

const ShopNavigator = createDrawerNavigator({
    Products:{
        screen:ProductsNavigator,
        drawerLabel: 'Products',
    },
    Orders:{
      screen:OrdersNavigator,
      drawerLabel:'Orders'
    }
    ,Admin:{
        screen:UsersNavigator,
        drawerLabel:'My Products'
      }
},{
    contentOptions:{
      activeTintColor:Colors.primary
    }
}
)
export default createAppContainer(ShopNavigator)