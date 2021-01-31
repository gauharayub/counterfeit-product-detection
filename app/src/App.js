import Routes from './Routes'
import './static/css/app.scss'
import { useEffect, useState } from 'react'
import Loader from './components/loader'
import provider from './store/web3Provider'

function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function setProvider() {
      // set web3 provider for the object...
      await provider.setProvider()
      // set account address for the object....
      await provider.setAccount()
      console.log( provider.getAccount())
      setLoaded(true)

      // set contract for the object..
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
