import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

const ProductItem = props => {

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    return (
        <View style={style.product}>
            <View style={style.touchable}>
 
               <TouchableComponent onPress={props.onSelect} useForeground>

                    <View>


                        <View style={style.imageContainer}>
                            <Image style={style.image} source={{ uri: props.image }} />

                        </View>
                        <View style={style.details}>
                            <Text style={style.title}>{props.title}</Text>
                            <Text style={style.price}>$ {(props.price.toFixed(2))}</Text>
                        </View>

                        <View style={style.actions}>
                           {
                               props.children
                           }
                        </View>
                    </View>

                </TouchableComponent>

            </View>

        </View>

    )
}

const style = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    touchable: {
        overflow: "hidden",
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily:'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily:'open-sans'
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '18%',
        padding: 10
    }

})

export default ProductItem;