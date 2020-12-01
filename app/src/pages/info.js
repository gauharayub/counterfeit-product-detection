import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance'
import '../static/css/signup.css';
import '../static/css/vendor.css';
import '../static/css/info.css';

export default function ProductInfo(props) {
    
    const [productInfo, setProductInfo] = useState(''); 
    const [sellerInfo, setSellerInfo] = useState('');
    
    const productId = window.location.pathname.split('/')[1];


    useEffect(() => {

        async function fetchProductInfo() {
            try {
                const response = await Axios.post(
                    '/user/productdetails',
                    { productId: productId }
                );
                if(response.data){
                    setProductInfo(response.data.productDetails);
                }
                console.log(response);
            } 
            catch (e) {
                console.error(e);
            }
        }

        async function fetchSellerInfo() {
            try {
                const response = await Axios.post(
                    '/user/productseller',
                    { productId: productId }
                );
                if(response.data){
                    setSellerInfo(response.data.seller);
                }
                console.log(response);
            } 
            catch (e) {
                console.error(e);
            }
        }

        fetchProductInfo();
        fetchSellerInfo();
    })

    // const product = {
    //     productName:'',
    //     productId: '',
    //     productPrice:'',
    //     productDetails:''
    // }

    // const seller = {
    //     sellerName:'',
    //     sellerId: '',
    //     sellerDetails:''
    // }

    // if(!productInfo || !sellerInfo){
    //     return (<Loader/>)
    // }
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
                                    { productInfo.name }
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
                    <div className="col-lg-6">
                        <div>
                            <h1>Seller </h1>
                            <div className="product-details">
                                <h3>Seller Name</h3>
                                <p>
                                    { sellerInfo.sellerName }
                                </p>
                                <h3>Seller ID</h3>
                                <p>
                                    { sellerInfo.sellerId }
                                </p>
                                <h3>Seller Details</h3>
                                <p>
                                    { sellerInfo.sellerDetails }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="buy-button-container">
                        <Button>BUY AND VERIFY</Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}