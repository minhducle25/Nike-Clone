import * as ActionType from "../Constants/constant"
let initialState = {
    dataOrder: [],
    dataProcess: [],
    dataDelivered: [],
}

const reducer = ( state = initialState, {type, payload}) => {
    switch(type){
        case ActionType.DATA_ORDER:
            state.dataOrder = payload
            break
        case ActionType.DATA_DELIVERED:
            state.dataDelivered = payload
            break
        case ActionType.DATA_PROCESS:
            state.dataProcess = payload
            break
        default:
            break
            }
    return{...state}

}
export default reducer