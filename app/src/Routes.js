import { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
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
const Scan = lazy(() => import('./pages/scan'))
const QRCode = lazy(() => import('./pages/qrcode'))
const AddOwner = lazy(() => import('./pages/addOwner'))


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
          <Route path='/add' component={AddProduct} />
          <Route path='/sell' component={Sell} />
          <Route path='/products' component={Products} />
          <Route path='/qrcode' component={QRCode} />
          <Route path='/addowner' component={AddOwner} />
        </Switch>
        <Route component={Footer} />
      </Router>
      <Toast />
    </>
  );
}

export default Routes;
