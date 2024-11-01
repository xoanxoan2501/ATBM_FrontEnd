import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesComponent from './router/RoutesComponet';
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
    <>
      <Router>
        <RoutesComponent />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transitio={Bounce}
      />
    </>
  );
};

export default App;
