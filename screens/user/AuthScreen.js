import React, { useState, useEffect,useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  AccessibilityPropertiesIOS,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth.action'
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

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


const AuthScreen = props => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });
  useEffect(()=>{
    if(error){
      Alert.alert('An error ocurred', error, [{text:'Okay'}])
    }
  },[error])

  const authHandler = async () => {

    let action;
    if (isSignup) {

      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )

    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password)
    }
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action);
      props.navigation.navigate('Shop')
    } catch (error) {
       setError(error.message)
       setIsLoading(false)
    }


  };

  const inputChangeHandler = useCallback(

    (inputIdentifier, inputValue, inputValidity) => {
      console.log('ok');
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={authHandler} />}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
