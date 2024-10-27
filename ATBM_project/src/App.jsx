import DefaultLayout from "./layouts";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import Endow from "./pages/Home/Item/Endow/Endow";
import ProductSlider from "./pages/Home/ProductSlider/ProductSlider";
import CardSlider from "./pages/Home/Item/CardSlider/CardSlider";
import ProductPhone from "./pages/Home/ProductSlider/ProductPhone";
import CardTV from "./components/CardTV/CardTV";
import TVandRadio from "./pages/Home/ProductSlider/TVandRadio/TVandRadio";
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import CardProductCategory from "./components/CardProductCategory/CardProductCategory";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Search from './components/Search/search';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import User from "./pages/Admin/user/user";
import Product from "./pages/Admin/Product/Product";
import AppBar from "./pages/Admin/AppBar/AppBar";
import CategoryAdmin from "./pages/Admin/Category/Category";
import CategoryItem from "./pages/Admin/Category/CategoryItem/CategoryItem";

// * Thứ tự thực hiện khi 1 component khởi tạo hoặc re-render:
// * 1: Thực hiện hàm clean
// * 2: Thực hiện khởi tạo hoặc cập nhật các giá trị cho state
// * 3: Thực hiện các logic trong component
// * 4: Thực hiện render code jsx ra giao diện
// * 5: Thực hiện hàm callback trong useEffect

// * useEffect có 3 cơ chế:
// * 1: chỉ truyền vào 1 parameter là callback => callback trong useFffect sẽ được gọi
// * lại sau mỗi lần component re-render
// * 2: truyền thêm tham số thứ 2 là 1 mảng rỗng => callback trong useFFect sẽ chỉ
// * được gọi 1 lần duy nhất ở lần khởi tạo component =. fetch data
// * 3: truyền vào mảng các giá trị dependency => callback trong useEffect sẽ
// * được gọi mỗi khi giá trị của dependency thay đổi => thực hiện logic với các state
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/login-page"
          element={
            <DefaultLayout>
              <LoginPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/register-page"
          element={
            <DefaultLayout>
              <RegisterPage />
            </DefaultLayout>
          }
        />
      <Route
          path="/productDetail-page"
          element={
            <DefaultLayout>
              <ProductDetail />
            </DefaultLayout>
          }
        />
      <Route
          path="/shopping-cart"
          element={
            <DefaultLayout>
              <ShoppingCart/>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin/user"
          element={
            <AdminLayout>
              <User />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/categoryAdmin"
          element={
            <AdminLayout>
              <CategoryAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/ProductAdmin"
          element={
            <AdminLayout>
              <ProductAdmin />
            </AdminLayout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App
