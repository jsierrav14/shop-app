import { LOGIN, SINGUP } from "../actions/auth.action"

const initialState = {
    token:null,
    userId:null
}
export default (state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return {
                token:action.token,
                userId:action.userId
            }
        case SINGUP:
            return {
                token:action.token,
                userId:action.userId
            }
        default:
            return state
    }
}