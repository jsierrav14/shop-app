import { AsyncStorage } from 'react-native'
export const SINGUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;
export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('useData');
  return {
    type: LOGOUT
  }
}
export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch(
      {
        type: AUTHENTICATE,
        userId: userId,
        token: token
      }
    )
  }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout()

  }
}
const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout)
    }, expirationTime )
  }

}
export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt9kKcGe1024-3KP7j73Q1LjHLXphy9e4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData)
      let message = "Something went wrong";
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exist already'
      } else if (errorId === 'INVALID_EMAIL') {
        message = 'This email is not valid'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid'
      }

      throw new Error(message)
    }
    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000))
    dispatch({ 
      type: SIGNUP, 
      token: resData.idToken,
       userId: resData.localId
     });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)


  };
};


export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt9kKcGe1024-3KP7j73Q1LjHLXphy9e4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData)
      let message = "Something went wrong";
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found'
      } else if (errorId === 'INVALID_EMAIL') {
        message = 'This email is not valid'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid'
      }

      throw new Error(message)
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken))
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toString()
  }))
}