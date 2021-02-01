import { useSetRecoilState,useRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { BiScan } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Loader from '../components/loader'
import provider from '../store/web3Provider'
import { popups,buyerAddress as ba, productId as pi } from '../store/atoms'

import '../static/css/login.scss'

export default function BuyProduct() {
    const setPopup = useSetRecoilState(popups)
    const [buyerAddress, setBuyerAddress] = useRecoilState(ba)
    const [productId, setProductId] = useRecoilState(pi)

    const [loading, setLoading] = useState(false)

    const schema = yup.object({
        productId: yup.string().required('Required!').max(30),
        address: yup.string().required('Required!').max(50, 'Enter 50 character long public address of buyer').min(16, 'Enter 16 character long public address of buyer'),
    });

    const initialValues = {
        productId: productId,
        address: buyerAddress,
    }

    async function sellProduct(values) {
        try {
            setLoading(true)
            const response = await provider.sendTransaction('sellProduct', [values.productId, values.address])
            console.log(response);
            if (response == "true") {
                setBuyerAddress('')
                setProductId('')
            }
            setPopup(response)

        }
        catch (error) {
            setPopup(error.message)
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }


    return (<section>

        <div className="containerS">
            <div className="frame">
                {loading ? <Loader size="normal" /> :
                    <div>
                        <div className="nav">
                            <ul className="links">
                                <li className="signin-active"><a className="btn">Sell To Other Sellers</a></li>
                            </ul>
                        </div>
                        <div className="formParent">

                            <Formik
                                validationSchema={schema}
                                onSubmit={sellProduct}
                                initialValues={initialValues}
                            >
                                <Fm className="form-signin" name="form">

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="1">
                                            <Form.Label>Address of other seller</Form.Label>
                                            <div className="d-flex">
                                                <Field
                                                    tabIndex="1"
                                                    type="text"
                                                    placeholder="address"
                                                    name="address"
                                                    className="form-styling" />

                                                <Link to={{ pathname: '/scan', query: { returnAddress: '/sell', value: 'buyerAddress' } }}>
                                                    <BiScan size={35} color="white" />
                                                </Link>

                                            </div>
                                            <ErrorMessage name="address" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="2">
                                            <Form.Label>Product ID</Form.Label>
                                            <div className="d-flex">

                                                <Field
                                                    tabIndex="2"
                                                    type="text"
                                                    placeholder="Product Id"
                                                    name="productId"
                                                    className="form-styling" />
                                                <Link to={{ pathname: '/scan', query: { returnAddress: '/sell', value: 'productId' } }}>
                                                    <BiScan size={35} color="white" />
                                                </Link>

                                            </div>
                                            <ErrorMessage name="productId" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Button className="btn btn-signup" tabIndex="4" type="submit">Sell</Button>

                                </Fm>
                            </Formik>
                        </div>
                    </div>
                }
            </div>
        </div>
    </section>)
}