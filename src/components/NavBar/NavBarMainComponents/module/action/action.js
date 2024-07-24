import { create } from "@mui/material/styles/createTransitions"
import API from "../../../../../Axios/API"
import * as ActionType from "../constant/constant"

export const emitOpenAction = (open) => {
    return{
        type: ActionType.REDUX,
        data: open
    }
}
// export const emitOpenSignUp = (openSU) => {
//     console.log(openSU);
//     return{
//         type: ActionType.SIGNUP,
//         data: openSU
//     }
// }
export const createAction = ({type,payload}) => {
    return{
        type,
        payload,
    }
}
export const fetchApiLoginUser = (data) => {
    return async(dispatch) => {
        try {
            const res = await API("users/login", "POST", data)
            dispatch(createAction({
                type:ActionType.FETCH_API_LOGIN,
                payload: res.data
            }))
            //set isAdmin
            if(res.data.user.userType === 'admin'){
                dispatch(createAction({
                    type: ActionType.SET_ADMIN,
                    payload: true
                }))
                localStorage.setItem("isAdmin", true)
            }
            else{
                localStorage.removeItem("isAdmin")
            }
            localStorage.setItem("user", JSON.stringify(res.data))
            alert(res.data.messager)
            const userLocal = JSON.parse(localStorage.getItem("user"))
            // console.log(userLocal);
            const favorLocal = userLocal?.user.productsFavorite
            localStorage.setItem("userFavor", JSON.stringify(favorLocal))
        }catch(err){
            alert("login fail")
        }
    }
}