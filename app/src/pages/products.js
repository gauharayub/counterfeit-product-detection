import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import { login as ll, popups, type as ti } from '../store/atoms'

// css-imports
import '../static/css/products.css';

export default function Products(props){

    const history = useHistory();

    const [productList, setProducts] = useState('');
    const [type, setType] = useRecoilState(ti);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await Axios.post(
                    `/${type.toLowerCase()}/getproducts`,
                    { ownerAddress: props.ownerAddress }
                );
                if(response.data && response.status===200){
                    setProducts(response);
                }
                console.log(response);
            } 
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [])

    const productInfo = (productId) => {
        history.push(`/productinfo/${productId}`);
    }
    

    if(!productList){
        return (<Loader/>)
    }

    if(productList.length === 0){
        return (
            <div className="productList">
                <h1>PRODUCTS</h1>
                <div className="no-product-message"> No products added yet</div>
            </div>
        )
    }


    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group">
                <ListGroup>
                    {   
                        productList.map((product, idx)=> (
                            <ListGroup.Item action onClick={()=>{productInfo(product.productId)}}>
                                {(idx+1) + ". " + product.productId }
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
        </div>
    )
}