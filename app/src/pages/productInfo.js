import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import QRCode from "react-qr-code";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { type as ti } from '../store/atoms';

// css....
import '../static/css/signup.css';
import '../static/css/info.css';

export default function ProductInfo() {
    
    const [productInfo, setProductInfo] = useState(' '); 
    const [type, setType] = useRecoilState(ti);
    const productId = window.location.pathname.split('/')[1];
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchProductInfo() {
            try {
                const response = await Axios.post(
                    `/${type.toLowerCase()}/productdetails`,
                    { productId: productId }
                );
                if(response.data && response.status===200){
                    setProductInfo(response.data.productDetails);
                }
                console.log(response);
            } 
            catch (e) {
                console.error(e);
            }
        }
        fetchProductInfo();
    }, []);


    return (
        <div className="signupdiv Signup ">
            <div className="signupdetailscontainer signupcontainer info-page">
                <div className="row">
                    <div className="center-content">
                    {loading ? <Loader size="normal" /> :
                    <div>
                        <h1 className="center-heading">PRODUCT</h1>
                        <div className="product-details">
                            <h3>Product Name</h3>
                            <p>
                                { productInfo.productName }
                            </p>
                            <h3>Product Price</h3>
                            <p>
                                { productInfo.productPrice }
                            </p>
                            <h3>Product ID</h3>
                            <p>
                                { productInfo.productId }
                            </p>
                            <h3>Product Details</h3>
                            <p>
                                { productInfo.productDetails }
                            </p>
                        </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div>
                <div className="qrcode-container">
                    <h3>PRODUCT QR CODE</h3>   
                    <QRCode value={productId} />
                </div>
            </div>
        </div>
    )
}