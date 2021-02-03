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
      await provider.setContract();
      setLoaded(true)
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
