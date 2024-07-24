import * as ActionType from "../constant/constant";
const userLocal = JSON.parse(localStorage.getItem("user"));
let initialState = {
  open: false,
  openSU: false,
  user: userLocal,
  dataAll: [],
  dataSearchList: [],
  dataSuggest: [],
  isAdmin: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REDUX:
      state.open = action.data;
      break;
    case ActionType.SIGNUP:
      state.openSU = action.data;
      break;
    case ActionType.LOGOUT:
      state.user = action.payload;
      state.isAdmin = false;
    case ActionType.FETCH_API_LOGIN:
      state.user = action.payload;
      state.open = false;
    case ActionType.DATA_ALL:
      state.dataAll = action.payload;
    case ActionType.SEARCH:
      state.dataSearchList = action.payload;
    case ActionType.SUGGEST:
      state.dataSuggest = action.payload;
    case ActionType.SET_ADMIN:
      state.isAdmin = action.payload;
      break;
    default:
      break;
  }
  return { ...state };
};
export default reducer;
