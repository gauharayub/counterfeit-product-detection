import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import QRCode from "react-qr-code";
import { useSetRecoilState } from 'recoil';
import { popups } from '../store/atoms';

// css....
import '../static/css/signup.css';
import '../static/css/info.scss';
import provider from '../store/web3Provider';

export default function ProductInfo() {
    const setPopup = useSetRecoilState(popups)

    const [productInfo, setProductInfo] = useState(' ');
    const productId = window.location.pathname.split('/')[2]
    const [loading, setLoading] = useState(false);

    useEffect(async () => {

        try {
            setLoading(true)
            const response = await provider.callTransaction('productDetails',[productId])
            console.log(response);
            if (response) {
                setProductInfo(response);
            }
        }
        catch (e) {
            console.error(e);
            setPopup(e.message)
        }
        finally {
            setLoading(false)
        }

    }, []);


    return (
        <div className="container my-4 CI ">
            <div className="d-flex small">
                <div className="center">
                    <div>
                        {loading ? <Loader size="normal" /> :
                            <div>
                                <h2 className="center-heading">Product Info</h2>
                                <div className="product-details">
                                    <p>Product Name : <span>
                                        {productInfo.name}
                                    </span></p>

                                    <p>Product Price : <span>
                                        {productInfo.price}
                                    </span></p>

                                    <p>Product ID : <span>
                                        {productId}
                                    </span></p>

                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <div>
                <div className="qrcode-container">
                    <h3>Qr Code : </h3>
                    <div className="qrParent">
                    {productId &&<QRCode value={productId} />}
                    </div>
                </div>
            </div>
        </div>
    )
}