import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';

// css-imports
import '../static/css/products.css';

export default function Products(props){

    const history = useHistory();

    const [productList, setProducts] = useState('');

    useEffect(()=>{
        // async function fetchData() {
        //     try {
        //         const response = await Axios.post(
        //             `/${props.type}/getproducts`,
        //             { ownerAddress: props.data }
        //         );
        //         if(true){
        //             setProducts([{name:"aa", productId:"aa"}]);
        //         }
        //         console.log(response);
        //     } 
        //     catch (e) {
        //         setProducts([{name:"aa", productId:"aa"}]);
        //         console.error(e);
        //     }
        // }
        // fetchData();
    }, [])

    const productInfo = (productId) => {
        history.push(`/productinfo/:${productId}`);
    }
    

    // if(!productList){
    //     return (<Loader/>)
    // }

    if(productList.length === 0){
        return (
            <div className="productList">
                <h1>PRODUCTS</h1>
                <div class="no-product-message"> No products added yet</div>
            </div>
        )
    }


    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group">
                <ListGroup>
                    {   
                        productList.map((product)=> (
                            <ListGroup.Item action onClick={()=>{productInfo(product.productId)}}>
                                { product.productId }
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
        </div>
    )
}