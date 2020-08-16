import React, {useState}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import productReducer from './store/reducers/product.reducer'
import cartReducer from './store/reducers/cart.reducer'
import ordersReducer from './store/reducers/orders.reducer'
import authReducer from './store/reducers/auth.reducer';
import ShopNavigator from './navigation/ShopNavigation'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
const fetchFonts =()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')

  })
}

export default function App() {
  
  const [fontLoaded, setFontLoaded ] = useState(false)
  if(!fontLoaded){

    return(
      <AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)} />
    )
  }


  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
