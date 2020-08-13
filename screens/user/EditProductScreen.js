import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, ScrollView, Platform, Alert, ActionSheetIOS, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/product.action'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const REDUCER_UPDATE = 'UPDATE'
const formReducer = (state, action) => {
    if (action.type === REDUCER_UPDATE) {
        const updateValue = {
            ...state.inputValues,
            [action.input]: action.value,
        };

        const updateValidities = {
            ...state.inputValities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for (const key in updateValidities) {
            formIsValid = formIsValid && updateValidities[key]
                ;
        }
        return {
            formIsValid: formIsValid,
            inputValidities: updateValidities,
            inputValues: updateValue
        }

    }

    return state
}
const EditProductScreen = props => {


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(error)
    const prodId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))



    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        {
            inputValues: {
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                description: editedProduct ? editedProduct.description : '',
                price: ''
            },
            inputValidities: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false
            },
            formIsValid: editedProduct ? true : false
        })


    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input', 'Please check the errors in the forms')
            return;
        }
        setError(null);
        setIsLoading(true)
        if (editedProduct) {
            try {

                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl))
                setIsLoading(false)
            } catch (error) {
                setError(error.message)
            }

        } else {
            try {
                dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl,
                        +formState.inputValues.price))
                setIsLoading(false)
                props.navigation.goBack()
            } catch (error) {
                setError(error.message)
            }

        }

    }, [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback(

        (inputIdentifier, inputValue, inputValidity) => {
            console.log('INPUT', inputValue, inputIdentifier)
            dispatchFormState({
                type: REDUCER_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if (error) {
            Alert.alert('An error ocurred', error, [{ text: 'Ok' }])
        }
    }, [])
    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100} >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText="Please enter a valid title"
                        keyboardType='default'
                        autoCorrect={false}
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText="Please enter a valid url"
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText="Please enter a valid Price"
                            keyboardType='decimal-pad'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}


                        />
                    )

                    }

                    <Input
                        id='description'
                        label="Description"
                        errorText="Please enter a valid description"
                        keyboardType='default'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}


                    />
                </View>


            </ScrollView>
        </KeyboardAvoidingView>)

}

EditProductScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={() => {

                }}
                onPress={submit} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }



})

export default EditProductScreen;