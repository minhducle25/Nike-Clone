import HomePage from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailProductPage from "./pages/DetailProduct/DetailProductPage";
import CartPage from "./pages/Cart/CartPage";
import NavBar from "./components/NavBar/NavBar";
import UserOrder from "./pages/User/UserOrder";
import UserProfile from "./components/User/userProfile/userProfile";
import ListProductPage from "./pages/ListProduct/ListProductPage";
import UserFavoriteComponent from "./components/User/userFavorite/userFavorite";
import AdminUser from "./pages/Admin/adminUser";
import Dashboard from "./pages/Admin/adminDashboard";
import AdminProduct from "./pages/Admin/adminProduct";
import EditProductForm from "./pages/Admin/editProductForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" caseSensitive={true} element={<HomePage />} />
            <Route path="/producDetail/:id" element={<DetailProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user/favorite" element={<UserFavoriteComponent />} />
            <Route path="/user/order" element={<UserOrder />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="/listProduct" element={<ListProductPage />} />
          </Route>
          <Route path="/admin" element={<AdminUser />} />
          <Route path="/adminDashboard" element={<Dashboard />} />
          <Route path="/adminProduct" element={<AdminProduct />} />
          <Route path="/editProductForm" element={<EditProductForm />} />
        </Routes>
        {/* <Route path="/managerCart" element={<CartManager />}/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
