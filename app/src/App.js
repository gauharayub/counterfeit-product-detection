import { useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { login as ll } from './store/atoms'
import Axios from './store/axiosInstance'
import Loader from './components/loader'

import Routes from './Routes'

function App() {
  const setLogin = useSetRecoilState(ll)
  const [request, setRequest] = useState(false)
  useEffect(async () => {
    try {
      const response = await Axios.get('/tokenVerify')
      if (response.status === 200) {
        console.log("Token verified")
        setLogin(true)
      }
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setRequest(true)
    }
  }, [])


  return (
    <div>
      { (request) ? <Routes /> : <Loader />}
    </div>
  );
}



export default App;
