import * as ActionType from "../Constant/constant"

let initialState = {
    listUser: [],
};

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionType.LIST_USER:
            state.listUser = payload
        break;
    }
    return {...state}
}

export default reducer