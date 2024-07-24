import { combineReducers } from "redux";
import reducerURL from "../../components/ListProduct/module/reducer/reducer";
import reducerCart from "../../components/Body/Cart/module/reducer/reducer"
import reducerSignSignUp from "../../components/NavBar/NavBarMainComponents/module/reducer/reducer"
import reducerOrder from "../../components/User/userOrder/module/Reducers/reducers"
import reducerAdmin from "../../components/Admin/Redux/Reducer/reducer"
const rootReducer = combineReducers({
  reducerURL,
  reducerCart,
  reducerSignSignUp,
  reducerOrder,
  reducerAdmin,
});
export default rootReducer;
