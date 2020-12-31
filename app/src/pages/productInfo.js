import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import QRCode from "react-qr-code";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { type as ti, popups } from '../store/atoms';

// css....
import '../static/css/signup.css';
import '../static/css/info.scss';

export default function ProductInfo() {
    const setPopup = useSetRecoilState(popups)

    const [productInfo, setProductInfo] = useState(' ');
    const [type, setType] = useRecoilState(ti);
    const productId = window.location.pathname.split('/')[2]
    const [loading, setLoading] = useState(false);

    useEffect(async () => {

        try {
            setLoading(true)
            const response = await Axios.post(
                `/${type.toLowerCase()}/productdetails`,
                { productId: productId }
            );
            if (response.data) {
                setProductInfo(response.data.productDetails);
            }
            console.log(response);
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

                                    <p>Product Details : <span>
                                        {productInfo.details}
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