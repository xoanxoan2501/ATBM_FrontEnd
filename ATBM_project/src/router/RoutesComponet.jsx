import { Outlet, Route, Routes } from 'react-router-dom';
import { routes } from '@/config/routeConfig';
import { Fragment } from 'react';
import AdminLayout from '@/layouts/AdminLayouts/AdminLayout';
import User from '@/pages/Admin/user/User';
import CategoryAdmin from '@/pages/Admin/CategoryAdmin/CategoryAdmin';
import ProductAdmin from '@/pages/Admin/Product/ProductAdmin';
import useGlobalVariableContext from '@/hooks/MyProvider';
import { Navigate } from 'react-router-dom';

import DefaultLayout from '@/layouts';

import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import Category from '@/pages/Category/Category';
import NotFoundPage from '@/pages/404/NotFoundPage';
import Profile from '@/pages/Profile/Profile';
import Cart from '@/components/Cart/Cart';
const publicRouteList = [
  { path: routes.HomePage, component: HomePage, layout: DefaultLayout },
  { path: routes.LoginPage, component: LoginPage, layout: DefaultLayout },
  { path: routes.CategoryPage, component: Category, layout: DefaultLayout },
  { path: routes.RegisterPage, component: RegisterPage, layout: DefaultLayout },
  { path: routes.Cart, component: Cart, layout: DefaultLayout },
];
const authenticatedRouteList = [
  { path: routes.AdminUser, component: User, layout: AdminLayout },
  { path: routes.Profile, component: Profile, layout: DefaultLayout },

  { path: routes.AdminCategory, component: CategoryAdmin, layout: AdminLayout },
  { path: routes.AdminProduct, component: ProductAdmin, layout: AdminLayout },
];

const ProtecTedRoute = () => {
  const { user } = useGlobalVariableContext();
  if (!user) {
    return <Navigate to={routes.LoginPage} />;
  }
  return <Outlet />;
};
function RoutesComponent() {
  return (
    <Routes>
      {authenticatedRouteList.map((route, index) => {
        const Page = route.component;
        let Layout = Fragment;
        if (route.layout) {
          Layout = route.layout;
        }
        return (
          <Route key={index} element={<ProtecTedRoute />}>
            <Route
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          </Route>
        );
      })}
      {publicRouteList.map((route) => {
        const Page = route.component;
        let Layout = Fragment;
        if (route.layout) {
          Layout = route.layout;
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RoutesComponent;
