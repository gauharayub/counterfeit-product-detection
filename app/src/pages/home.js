import { useRecoilValue } from 'recoil'
import { Link, useHistory } from 'react-router-dom'
import '../static/css/login.css'
import { BiScan } from 'react-icons/bi'

import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Form, Col, Button } from 'react-bootstrap'

import { productIdHome as pih } from '../store/atoms'


function Home() {

    const history = useHistory()
    const productId = useRecoilValue(pih)

    const schema = yup.object({
        productId: yup.string().required('Required!').max(30),
    });

    const initialValues = {
        productId: productId,
    }

    function handleSubmit(values) {
        history.push(`/product/${values.productId}`)
    }

    return (<div className="container my-4 px-0" >
        <section>

            <div className="containerS">
                <div className="frame">
                    <div className="nav">
                        <ul className="links">
                            <li className="signin-active"><a className="btn">Enter Product Id</a></li>
                        </ul>
                    </div>
                    <div className="formParent">

                        <Formik
                            validationSchema={schema}
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Fm className="form-signin" name="form">

                                <Form.Row>
                                    <Form.Group as={Col} controlId="1">
                                        <Form.Label>Product Id</Form.Label>
                                        <div className="d-flex">

                                            <Field
                                                tabIndex="1"
                                                type="text"
                                                placeholder="Product Id"
                                                name="productId"
                                                className="form-styling" />

                                            <Link to={{ pathname: '/scan', query: { returnAddress: '/', value: 'productIdHome' } }}>
                                                <BiScan size={35} color="white" />
                                            </Link>

                                        </div>
                                        <ErrorMessage name="productId" />

                                    </Form.Group>
                                </Form.Row>

                                <Button className="btn btn-signup" tabIndex="4" type="submit">Buy</Button>

                            </Fm>
                        </Formik>
                    </div>
                </div>
            </div>
        </section>

    </div>)
}

export default Home