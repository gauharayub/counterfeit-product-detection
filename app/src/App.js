import { useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { login as ll,type } from './store/atoms'
import Axios from './store/axiosInstance'
import Loader from './components/loader'
import Routes from './Routes'

import './static/css/app.scss'

function App() {
  const setLogin = useSetRecoilState(ll)
  const [request, setRequest] = useState(false)
  const setUserType = useSetRecoilState(type) 
  useEffect(async () => {
    try {
      if(localStorage.getItem('type'))
      {
        setUserType(localStorage.getItem('type'))
      }
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
