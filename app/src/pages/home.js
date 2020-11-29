import QrReader from 'react-qr-scanner';
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

import '../static/css/qrcode.scss'

function QrCode() {

    const [data, setData] = useState('')
    const [scanError, setScanError] = useState('')


    function qrError(error) {
        setScanError(error)
    }

    function qrScan(dt) {
        if (dt && dt !== data) {
            // console.log("hemlo",dt,typeof(dt),typeof(data));
            setData(dt)
        }
    }


    return (<div className="container my-4 px-0" >
        <div id="scanner">
            <QrReader
                delay={500}
                onError={qrError}
                onScan={qrScan}
            />
        </div>

        <div id="data">
            <p className="border p-4">Id is : <span>{data ? data : "Scanning"}</span></p>
            {data ?<Link to={`/product/${data}`} className="btn btn-primary">Check</Link>:<Button className="btn btn-primary">Check</Button>}
        </div>
        {scanError && <div className="my-4">
            <p>scanError</p>
        </div>
        }

    </div>)
}

export default QrCode