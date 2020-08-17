import { LOGIN, SINGUP, AUTHENTICATE, LOGOUT } from "../actions/auth.action"

const initialState = {
    token:null,
    userId:null
}
export default (state=initialState,action)=>{
    switch(action.type){
        case AUTHENTICATE:
            return {
                token:action.token,
                userId:action.userId
            }
        case LOGOUT:{
            return initialState
        }
     /*   case SINGUP:
            return {
                token:action.token,
                userId:action.userId
            }*/
        default:
            return state
    }
}