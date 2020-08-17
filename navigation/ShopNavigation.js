import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import Colors from '../constants/Colors'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import {useDispatch} from 'react-redux'
import * as authActions  from '../store/actions/auth.action'
import {Ionicons} from '@expo/vector-icons'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import  UserProductsScreen  from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

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
    },
    contentComponent:props=>{
     const dispatch = useDispatch()
       return (
       <View style={{flex:1, padding:20}}>
         <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
         <DrawerItems {...props}/>
         <Button 
         title="Logout"  
         color={Colors.primary} 
         onPress={()=>{
            dispatch(authActions.logout())
         //   props.navigation.navigate('Auth')
            }}/>
         </SafeAreaView>

       </View>
       )
    }
}
)
const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
},{
    defaultNavigationOptions:defaultNavigation
})
const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    Shop:ShopNavigator
})
export default createAppContainer(MainNavigator)