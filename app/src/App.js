import Routes from './Routes'
import './static/css/app.scss'
import { useEffect, useState } from 'react'
import Loader from './components/loader'
import provider from './store/web3Provider'
import {useSetRecoilState} from 'recoil'
import {login as ll} from './store/atoms'
function App() {
  const setLogin = useSetRecoilState(ll)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function setProvider() {
      await provider.setProvider()
      await provider.setContract();

      // const res = await provider.isLoggedIn()
      // if (res.state) {
      //   setLogin(true)
      // }
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
