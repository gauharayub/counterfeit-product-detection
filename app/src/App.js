import Web3 from 'web3'
import { useState, useEffect } from 'react'

import QrCode from './QrCode'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [to, setTo] = useState('')
  const [web3i, setWeb3i] = useState(null)
  const [accounts, setAccounts] = useState([])

  async function permissionAllowed() {
    let newBrowser = false

    if (window.ethereum) {
      newBrowser = true
      setWeb3i(new Web3(window.ethereum))
    }
    else if (window.web3) {
      setWeb3i(new Web3(Web3.currentProvider))
    }
    else {
      return alert("add metamask")
    }

    if (newBrowser) {
      try {
        await window.ethereum.enable()
      } catch (error) {
        return alert("permission denied")
      }
    }
  }

  async function getAccount() {
    setAccounts(await window.ethereum.request({ method: 'eth_requestAccounts' }))
  }

  // async function sendEther(event) {
  //   try {
  //     event.preventDefault()
  //     await permissionAllowed()
  //     await getAccount()

  //     console.log(accounts)

  //     const amount = web3i.utils.toWei("0.5", "ether")
  //     const result = await web3i.eth.sendTransaction({
  //       to: receiver,
  //       from: accounts[0],
  //       value: amount,
  //     })
  //     console.log("result", result)

  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  function updateTo(event) {
    setTo(event.currentTarget.value)
  }

  useEffect(() => {
    console.log("Effect account", accounts)
  }, [accounts])

  return (<Router>
    <Switch>
      <Route path="/" exact component={QrCode} />
      <Route path="/product/:id">
        <div className="container my-4">
          {/* <form className="my-4" onSubmit={sendEther}>
        <input className="p-2 m-2 d-block" type="text" placeholder="to" value={to} onChange={updateTo} />
        <Button className="p-2 m-4" type="submit">Send</Button>
      </form> */}
        </div>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
