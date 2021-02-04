import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Loader from '../components/loader';
import { popups } from '../store/atoms'
import provider from '../store/web3Provider'
// css-imports
import '../static/css/products.css';

export default function Products() {
    const setPopup = useSetRecoilState(popups)
    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [productList, setProducts] = useState('');
    const [failMessage, setFailMessage] = useState('')

    useEffect(() => {
        
        async function getProductList(){
            try {
                setLoading(true)
                const response = await provider.callTransaction('getAllProducts')
                console.log(response);
                if (response.code) {
                    console.log(response.message);
                    setFailMessage(response.message);
                }
                else {
                    setProducts(response);
                }
            }
            catch (e) {
                console.error(e);
                setPopup(e.message)
            }
            finally {
                setLoading(false)
            }
        }

        getProductList();

    }, [])

    const productInfo = (productId) => {
        history.push(`/productinfo/${productId}`);
    }

    return (
        <div className="productList">
            <div className="container">
                <h1>Products you own</h1>
                <div className="list-group">
                    {loading ? <Loader /> :
                        (failMessage ? <div className="text-center">No Products added yet</div> : productList.map((product, idx) =>
                            <div className="berber" onClick={() => { productInfo(product[0]) }}>
                                <div className="berber-image">
                                    {(idx + 1)}.
                        </div>
                                <p className="berber-fullname">
                                    {product[0]}
                                </p>
                                <p className="berber-dukkan">
                                    {product[2]}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}