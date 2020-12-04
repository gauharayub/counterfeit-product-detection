import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { useRecoilState,useSetRecoilState } from 'recoil';
import Loader from '../components/loader';
import Axios from '../store/axiosInstance';
import { login as ll, popups, type as ti } from '../store/atoms'

// css-imports
import '../static/css/products.css';

export default function Products() {
    const setPopup = useSetRecoilState(popups)


    const history = useHistory();

    const [loading, setLoading] = useState(false)

    const [productList, setProducts] = useState('');
    const [type, setType] = useRecoilState(ti);

    useEffect(async () => {

        try {
            setLoading(true)
            const response = await Axios.post(
                `/${type.toLowerCase()}/getproducts`, {
                type: type.toLowerCase()
            }
            );
            console.log(response.data);
            if (response.data) {
                setProducts(response.data);
            }
            console.log(response);
        }
        catch (e) {
            console.error(e);
            setPopup(e.message)
        }
        finally {
            setLoading(false)
        }


    }, [])

    const productInfo = (productId) => {
        history.push(`/productinfo/${productId}`);
    }

    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group" style={{ position: "relative" }}>
                {loading ? <Loader size="normal" /> :
                    <div>
                        <ListGroup>
                            {
                                productList && productList.map((product, idx) => (
                                    <ListGroup.Item action onClick={() => { productInfo(product[0]) }}>
                                        {(idx + 1) + ". " + product[2]}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </div>}
            </div>
        </div>
    )
}