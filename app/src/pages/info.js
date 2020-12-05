import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance'
import { useRecoilState } from 'recoil'
import { popups as pp } from '../store/atoms'
import '../static/css/signup.css';
import '../static/css/info.css';

export default function ProductInfo() {
    
    const [productInfo, setProductInfo] = useState(''); 
    const [sellerInfo, setSellerInfo] = useState('');
    const [popup, setPopup] = useRecoilState(pp);
    const productId = window.location.pathname.split('/')[2];


    useEffect(() => {

        async function fetchProductInfo() {
            try {
                const response = await Axios.post(
                    '/user/productdetails',
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

        async function fetchSellerInfo() {
            try {
                const response = await Axios.post(
                    '/user/productseller',
                    { productId: productId }
                );
                if(response.data && response.status===200){
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
        // setProductInfo({name:'Aspirin', price:'$2', details: 'Pharmaceutical product'})
        // setSellerInfo({name: 'GenoHealth', id:345, details:'One of the largest pharmacy'})
    }, [])

    const buyAndVerify = async (secretId) => {
        try {
            const response = await Axios.post(
                '/user/buyproduct',
                { secretId: secretId }
            );
            if(response.data.success){
                setPopup('Purchase successfull');
            }
            else if(response.data.error){
                setPopup('Product is counterfieted');
            }
            console.log(response);
        } 
        catch (e) {
            console.error(e);
            setPopup('Product puchase failed');
        }
    }


    if(!productInfo || !sellerInfo){
        return (<Loader/>)
    }
    return (
        <div className="signupdiv Signup info-container">
            <div className="signupdetailscontainer signupcontainer info-page info-user">
                <div className="row">
                    <div className="col-lg-6">
                        <div>
                            <div className="product-details">
                                <h1>PRODUCT</h1>
                                <div>
                                    <h3>Product Name</h3>
                                    <p>
                                        { productInfo.name }
                                    </p>
                                    <h3>Product Price</h3>
                                    <p>
                                        { productInfo.price }
                                    </p>
                                    <h3>Product ID</h3>
                                    <p>
                                        { productId }
                                    </p>
                                    <h3>Product Details</h3>
                                    <p>
                                        { productInfo.details }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <div className="product-details">
                                <h1>SELLER</h1>
                                <h3>Seller Name</h3>
                                <p>
                                    { sellerInfo.name }
                                </p>
                                <h3>Seller ID</h3>
                                <p>
                                    { sellerInfo.id }
                                </p>
                                <h3>Seller Details</h3>
                                <p>
                                    { sellerInfo.details }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="buy-button-container">
                        <Button onClick={()=>{buyAndVerify(productId)}}>BUY AND VERIFY</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}