import React from 'react'
import { FlatList, Button, Alert } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/product.action'
import Colors from '../../constants/Colors'
const UserProductsScreen = props => {
  const usersProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()


  const deleteHandler = (id) => {
    Alert.alert('Are you sure', ' Do you want to delete this item?', [
        { text: 'No', style: 'default' },
        {text:'Yes',style:'destructive',onPress:() => {
          dispatch(productActions.deleteProduct(id))
        }}
    ]
    )
}
  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id })
  }
  return <FlatList data={usersProducts} keyExtractor={item => item.id} renderItem={itemData =>
    (<ProductItem
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      onSelect={() => { editProductHandler(itemData.item.id) }} >
      <Button
        color={Colors.primary}
        title="Edit"
        onPress={() => {
          editProductHandler(itemData.item.id)
        }}
      />
      <Button
        color={Colors.primary}
        title="Delete"
        onPress={()=>deleteHandler(itemData.item.id)}
         />
    </ProductItem>)} />
}
UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer()
        }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => {
          navData.navigation.navigate('EditProduct')
        }} />
    </HeaderButtons>,
  }
}
export default UserProductsScreen;