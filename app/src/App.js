import { useRecoilValue, useSetRecoilState, RecoilRoot } from 'recoil'
import React, { useState, useEffect } from 'react';
import { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import { login as ll } from './store/atoms'
import Header from './components/header';
import Footer from './components/footer';

const Home = lazy(() => import(/* webpackChunkName: "HOME" */ './pages/home'))
const Login = lazy(() => import(/*webpackChunkName: "LOGIN" */ './pages/login'))
const Signup = lazy(() => import(/*webpackChunkName: "SIGNUP" */ './pages/signup'))
const Info = lazy(() => import(/*webpackChunkName: "INFO" */ './pages/info'))
const BuyProduct = lazy(() => import(/*webpackChunkName: "BUYPRODUCT" */ './pages/buyProduct'))
const AddProduct = lazy(() => import(/*webpackChunkName: "ADD" */ './pages/add'))
const Sell = lazy(() => import(/*webpackChunkName: "SELL" */ './pages/sell'))
const Products = lazy(() => import('./pages/products'))
const ProductInfo = lazy(() => import('./pages/productInfo'))


function App() {

  const setLogin = useSetRecoilState(ll)

  

  return (
    <RecoilRoot>

      <Router>
        <Route component={Header} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={Info} />
          <Route path='/login' component={Login} />
          <Route path='/signup' exact component={Signup} />
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
        </Switch>
        <Route component={Footer} />
      </Router>
    </RecoilRoot>
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

export default App;
