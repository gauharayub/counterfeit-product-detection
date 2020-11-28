
import { useRecoilValue, useSetRecoilState,RecoilRoot } from 'recoil'
import { useEffect,lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route,Redirect
} from "react-router-dom";

import { login as ll } from './store/atoms'

import Header from './components/header';
import Footer from './components/footer';

const Home = lazy(() => import(/* webpackChunkName: "HOME" */ './pages/home'))
const Login = lazy(() => import(/*webpackChunkName: "LOGIN" */ './pages/login'))
const Signup = lazy(() => import(/*webpackChunkName: "SIGNUP" */ './pages/signup'))
const Info = lazy(() => import(/*webpackChunkName: "INFO" */ './pages/info'))
const BuyProduct = lazy(() => import(/*webpackChunkName: "BUYPRODUCT" */ './pages/buyProduct'))
const Add = lazy(() => import(/*webpackChunkName: "ADD" */ './pages/add'))
const Sell = lazy(() => import(/*webpackChunkName: "SELL" */ './pages/sell'))



function App() {

  const setLogin = useSetRecoilState(ll)

  // useEffect(() => {
  //   if (localStorage.getItem('login')) {
  //     const currentDate = new Date()
  //     //parsing date object stored in localstorage
  //     let storedDate = JSON.parse(localStorage.getItem('login'))
  //     //creating real date object with date only
  //     storedDate = new Date(storedDate.substr(0, 10))
  //     //if one month has passed since login
  //     if (currentDate >= storedDate) {
  //       //remove login from localstorage
  //       localStorage.removeItem('login')

  //     } else {
  //       setLogin(true)
  //     }
  //   }
  // }, [])


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

          <ProtectedRoute path='/add'>
            <Add />
          </ProtectedRoute>
          <ProtectedRoute path='/sell'>
            <Sell />
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
