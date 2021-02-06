import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { popups, secretId as si } from '../store/atoms'
import { useSetRecoilState } from 'recoil'
import provider from '../store/web3Provider'
//css
import '../static/css/login.scss';

export default function AddProduct() {

    //local state
    const [productId, setProductId] = useState('');
    const setPopup = useSetRecoilState(popups)

    const schema = yup.object({
        side: yup.string().required('Required!')
    });

    const initialValues = {
        side: "",
   
    }

    async function sideContract(values) {
        try {
            await provider.sendTransaction('setSideContract', ['0x01Fc7d7F9a52ED42964d8eEf1FaAC70f7399e38F']);
          
            setPopup('side contract successfully');

        } catch (error) {
            setPopup('Failed to add product');
            console.log(error)
        }
    }

    if (productId) {
        return (
            <Redirect to={`/qrcode/${productId}`} />
        )
    }

    return (<section>
        <div className="containerS">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn">Add Product</a></li>
                    </ul>
                </div>
                <div className="formParent">
                    <Formik
                        validationSchema={schema}
                        onSubmit={sideContract}
                        initialValues={initialValues}
                    >
                        <Fm key={1} className="form-signin" name="form">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Side Contract</Form.Label>
                                    <Field
                                        tabIndex="1"
                                        type="text"
                                        placeholder="Side Contract"
                                        name="side"
                                        className="form-styling" />
                                    <ErrorMessage name="side" />
                                </Form.Group>
                            </Form.Row>

                
                            <Button className="btn btn-signup" tabIndex="5" type="submit">Add Product</Button>
                        </Fm>
                    </Formik>
                </div>
            </div>
        </div>
    </section>
    )
}