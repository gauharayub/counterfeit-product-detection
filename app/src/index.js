import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/loader'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
   <Suspense fallback={<Loader />} >
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
