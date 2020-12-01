import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import '../static/css/products.css';

export default function Products(props){

    const history = useHistory();

    const [productList, setProducts] = useState('');

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await Axios.post(
                    `/${props.type}/getproducts`,
                    { ownerAddress: props.data }
                );
                if(response.data){
                    setProducts(response.data);
                }
                console.log(response);
            } 
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    })

    const productInfo = (productId) => {
        history.push(`/productinfo/:${productId}`);
    } 

    if(productList){
        productList.map((product) => 
            <ListGroup.Item action onClick={()=>{ productInfo(product.productId) }}>
                {product.name};
            </ListGroup.Item>
        );
    }
    

    // if(!productList){
    //     return (<Loader/>)
    // }
    if(productList.length === 0){
        return (
            <div className="productList">
                <h1>PRODUCTS</h1>
                <div> No products added yet</div>
            </div>
        )
    }

    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group">
                <ListGroup>
                    { productList }
                </ListGroup>
            </div>
        </div>
    )
}