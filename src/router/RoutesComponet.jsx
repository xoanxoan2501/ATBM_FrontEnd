import { Outlet, Route, Routes, Navigate } from 'react-router-dom'
import { routes } from '@/config/routeConfig'
import { Fragment } from 'react'
import AdminLayout from '@/layouts/AdminLayouts/AdminLayout'
import User from '@/pages/Admin/user/User'
import CategoryAdmin from '@/pages/Admin/CategoryAdmin/CategoryAdmin'
import ProductAdmin from '@/pages/Admin/Product/ProductAdmin'
import useGlobalVariableContext from '@/hooks/MyProvider'

import DefaultLayout from '@/layouts'
import HomePage from '@/pages/Home/HomePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import Category from '@/pages/Category/Category'
import NotFoundPage from '@/pages/404/NotFoundPage'
import Profile from '@/pages/Profile/Profile'
import Cart from '@/components/Cart/Cart'
import Contact from '@/pages/Contact/Contact'
import About from '@/pages/About/About'
import ProductDetailPage from '@/pages/Product/ProductDetailPage'
const publicRouteList = [
  { path: routes.LoginPage, component: LoginPage, layout: DefaultLayout },
  { path: routes.RegisterPage, component: RegisterPage, layout: DefaultLayout },
]

const authenticatedRouteList = [
  { path: routes.HomePage, component: HomePage, layout: DefaultLayout },
  { path: routes.ContrastPage, component: Contact, layout: DefaultLayout },
  { path: routes.AboutPage, component: About, layout: DefaultLayout },
  { path: routes.CategoryPage, component: Category, layout: DefaultLayout },
  {
    path: `${routes.ProductDetailPage}/:productId`,
    component: ProductDetailPage,
    layout: DefaultLayout,
  },

  { path: routes.Cart, component: Cart, layout: DefaultLayout },
  { path: routes.AdminUser, component: User, layout: AdminLayout },
  { path: routes.Profile, component: Profile, layout: DefaultLayout },
  { path: routes.AdminCategory, component: CategoryAdmin, layout: AdminLayout },
  { path: routes.AdminProduct, component: ProductAdmin, layout: AdminLayout },
]

// Sửa tên thành ProtectedRoute và kiểm tra điều kiện của user
const ProtectedRoute = () => {
  const { user } = useGlobalVariableContext()
  return user ? <Outlet /> : <Navigate to={routes.LoginPage} />
}

function RoutesComponent() {
  return (
    <Routes>
      {authenticatedRouteList.map((route, index) => {
        const Page = route.component
        const Layout = route.layout || Fragment
        return (
          <Route key={index} element={<ProtectedRoute />}>
            <Route
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          </Route>
        )
      })}

      {publicRouteList.map((route) => {
        const Page = route.component
        const Layout = route.layout || Fragment
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
        )
      })}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default RoutesComponent
