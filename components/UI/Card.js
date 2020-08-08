import React from 'react'
import {View,StyleSheet} from 'react-native'


const Card = props =>{
    return <View style={{...Styles.card,...props.styles}}>
    {props.children}
    </View>
}

const Styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        backgroundColor: 'white',
    }
})
export default Card;