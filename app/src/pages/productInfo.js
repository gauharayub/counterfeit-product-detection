import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import '../static/css/signup.css';
import '../static/css/vendor.css';
import '../static/css/info.css';

export default function ProductInfo(props) {
    
    const [productInfo, setProductInfo] = useState(' '); 
    const productId = window.location.pathname.split('/')[1];

    // use recoil state to set productInfo..

    const product = {
        productName:'',
        productId: '',
        productPrice:'',
        productDetails:''
    }

    return (
        <div className="signupdiv Signup ">
            <div className="signupdetailscontainer signupcontainer info-page">
                <div className="row">
                    <div className="center-content">
                        <h1 className="center-heading">Product</h1>
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
                    </div>
                </div>
            </div>
        </div>
    )
}