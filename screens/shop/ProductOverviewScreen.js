import React, { useEffect, useState,useCallback } from 'react'
import { StyleSheet, FlatList, Platform, Button, ActivityIndicator, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.action'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as ProductsActions from '../../store/actions/product.action'
const ProductOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState();
    const [refreshing,setIsRefreshing] =useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
    }
    const loadProducts = useCallback(async () => {
        console.log('PRODUCTS')
        setError(null)
        setIsRefreshing(true);
        try {
            await dispatch(ProductsActions.fetchProducts())
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
        setIsLoading(false)

    },[dispatch,setIsLoading, setError])

    useEffect(()=>{
      const willFocus = props.navigation.addListener('willFocus',loadProducts)  

      return ()=>{
          willFocus.remove()
      }
    },[loadProducts])


    useEffect(() => {

        loadProducts().then(result=>{
            setIsLoading(true)
        })
    }, [dispatch, loadProducts])


    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error ocurred</Text> 
                  <Button title="Try again" onPress={loadProducts} />
            </View>
        )
    }
    if (isLoading) {

        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" colors={Colors.primary} />
             
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text> No products found, Maybe start adding some!</Text>
            </View>
        )
    }
    return (<FlatList data={products}
        onRefresh={loadProducts}
        refreshing={refreshing}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}

                >
                    <Button
                        color={Colors.primary}
                        title="View Detail"
                        onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => dispatch(cartActions.addToCart(itemData.item))} />


                </ProductItem>)
        } />
    )
}

ProductOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'All Products',
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
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }} />
        </HeaderButtons>
    }


}
const styles = StyleSheet.create({

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default ProductOverviewScreen;