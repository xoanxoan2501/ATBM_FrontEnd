import DefaultLayout from "./layouts";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
const App = () => {
  return (
    <DefaultLayout>
      <RegisterPage />
    </DefaultLayout>
  );
};

export default App;
