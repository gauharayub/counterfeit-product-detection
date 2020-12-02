import { useRecoilValue } from 'recoil'
import { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import { login as ll } from './store/atoms'
import Header from './components/header';
import Footer from './components/footer';
import Toast from './Toast.js'

const Home = lazy(() => import(/* webpackChunkName: "HOME" */ './pages/home'))
const Login = lazy(() => import(/*webpackChunkName: "LOGIN" */ './pages/login'))
const Info = lazy(() => import(/*webpackChunkName: "INFO" */ './pages/info'))
const BuyProduct = lazy(() => import(/*webpackChunkName: "BUYPRODUCT" */ './pages/buyProduct'))
const AddProduct = lazy(() => import(/*webpackChunkName: "ADD" */ './pages/add'))
const Sell = lazy(() => import(/*webpackChunkName: "SELL" */ './pages/sell'))
const Products = lazy(() => import('./pages/products'))
const ProductInfo = lazy(() => import('./pages/productInfo'))
const Scan = lazy(()=> import('./pages/scan'))
const QRCode = lazy(() => import('./pages/qrcode'))

function Routes() {

  return (
      <>
      <Router>
        <Route component={Header} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/scan" exact component={Scan} />
          <Route path="/product/:id" component={Info} />
          <Route path='/login' component={Login} />
          <Route path='/buy' exact component={BuyProduct} />
          <Route path='/productinfo/:id' component={ProductInfo} />
          <ProtectedRoute path='/add'>
            <AddProduct />
          </ProtectedRoute>
          <ProtectedRoute path='/sell'>
            <Sell />
          </ProtectedRoute>
          <ProtectedRoute path='/products'>
            <Products />
          </ProtectedRoute>
          <ProtectedRoute path='/qrcode'>
            <QRCode />
          </ProtectedRoute>
        </Switch>
        <Route component={Footer} />
      </Router>
      <Toast />
      </>
  );
}

function ProtectedRoute(comp) {

  const { children, ...rest } = comp
  const login = useRecoilValue(ll)

  return (
    <Route
      {...rest}
      render={
        (
          { location }
        ) =>
          login
            ? children
            : <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
      }
    />
  )

}

export default Routes;
