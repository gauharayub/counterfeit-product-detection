import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import '../static/css/products.css';

export default function Products(){

    const history = useHistory();

    const productInfo = (productId) => {
        history.push(`/productinfo/:${productId}`);
    } 

    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group">
                <ListGroup>
                    <ListGroup.Item action onClick={()=>{ productInfo('5tyy') }}>
                        NAME
                    </ListGroup.Item>
                    {/* mock elements */}
                    <ListGroup.Item action>NAME</ListGroup.Item>
                    <ListGroup.Item action>NAME</ListGroup.Item>
                    <ListGroup.Item action>NAME</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}