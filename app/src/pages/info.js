import { React } from 'react'
import { Button } from 'react-bootstrap'

import '../static/css/signup.css';
import '../static/css/vendor.css';
import '../static/css/info.css';

export default function ProductInfo() {

    const product = {
        productName:'',
        productId: '',
        productPrice:'',
        productDetails:''
    }

    const seller = {
        sellerName:'',
        sellerId: '',
        sellerDetails:''
    }

    return (
        <div className="signupdiv Signup ">
            <div className="signupdetailscontainer signupcontainer info-page">
                <div className="row">
                    <div className="col-lg-6">
                        <div>
                            <h1>Product</h1>
                            <div className="product-details">
                                <h3>Product Name</h3>
                                <p>
                                    { product.productName }
                                </p>
                                <h3>Product Price</h3>
                                <p>
                                    { product.productPrice }
                                </p>
                                <h3>Product ID</h3>
                                <p>
                                    { product.productId }
                                </p>
                                <h3>Product Details</h3>
                                <p>
                                    { product.productDetails }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <h1>Seller </h1>
                            <div className="product-details">
                                <h3>Seller Name</h3>
                                <p>
                                    { seller.sellerName }
                                </p>
                                <h3>Seller ID</h3>
                                <p>
                                    { seller.sellerId }
                                </p>
                                <h3>Seller Details</h3>
                                <p>
                                    { seller.sellerDetails }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="buy-button-container">
                        <Button>Buy Product</Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}