import Routes from './Routes'
import './static/css/app.scss'
import { useEffect, useState } from 'react'
import Loader from './components/loader'
import provider from './store/web3Provider'

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function setProvider() {
      await provider.setProvider()
      await provider.setAccount()
      // await provider.setContract()
      console.log( provider.getAccount())
      setLoaded(true)
      await provider.setContract();
      // await provider.callTransaction('getAllProducts');
      // await provider.sendTransaction('registerOwnerAsSeller', ['wtaru', 'good']);
    }
    setProvider()
  }, [])
  return (
    <div>
      {(loaded) ? <Routes /> : <Loader />}
    </div>
  );
}

export default App;
