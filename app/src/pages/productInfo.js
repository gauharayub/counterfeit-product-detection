import React, { useState } from 'react';
import '../static/css/signup.css';
import '../static/css/vendor.css';
import '../static/css/info.css';

export default function ProductInfo() {
    
    // const [data, setData] = useState(' '); 
    // const productId = window.location.pathname.split('/')[1];


    // useEffect(()=>{
    //     // Axios.post(`/${user}/`, values).then(()=>{

    //     // })
    // })

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
            </div>
            
        </div>
    )
}