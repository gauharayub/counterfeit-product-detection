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

        // setProducts([[4356, "this is medicine", "Aspirin"], [5556, "this is branded shoe", "Adidas Neo"]])
    }, [])

    const productInfo = (productId) => {
        history.push(`/productinfo/${productId}`);
    }

    return (
        <div className="productList">
            <h1>PRODUCTS</h1>
            <div className="list-group">
                {  productList.map((product, idx) =>
                    <div className="berber" onClick={()=> {productInfo(product[0])}}>
                        <div className="berber-image">
                            {(idx+1)}.
                        </div>
                        <p class="berber-fullname">
                            { product[0] }
                        </p>
                        <p class="berber-dukkan">
                            { product[2] }
                        </p>
                    </div>
                )}    
            </div>
        </div>
    )
}