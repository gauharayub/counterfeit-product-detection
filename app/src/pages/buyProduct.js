import { useRecoilState, useSetRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useHistory, useLocation } from 'react-router-dom'

import { Form, Col, Button } from 'react-bootstrap'

import Axios from '../store/axiosInstance'
import '../static/css/login.css'

import { login as ll, popups } from '../store/atoms'

export default function BuyProduct() {
    const history = useHistory()
    const [login, setLogin] = useRecoilState(ll)
    const setPopup = useSetRecoilState(popups)

    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    if (login) {
        setPopup("Already Logged In!")
        history.replace('/')
    }

    const schema = yup.object({
        email: yup.string().required('Required!').max(250).email('Enter valid Email !'),
        password: yup.string().required('Required!').max(250),
        type: yup.string().required('Required!').max(10, 'Enter either "seller" or "owner"')
    });

    const initialValues = {
        email: "",
        type: "Seller",
        password: "",
    }


    const schemaSignup = yup.object({
        nameS: yup.string().required('Required!').max(250, 'Name Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        emailS: yup.string().required('Required!').max(250).email('Enter valid Email !'),
        password1S: yup.string().required('Required!').max(250),
        password2S: yup.string().required('Required!').oneOf([yup.ref('password1S'), null], "Password doesn't match"),
        detailsS: yup.string().required('Required!').max(350, 'Details Should be less than 350 characters')
    });

    const initialValuesSignup = {
        nameS: "",
        emailS: "",
        password1S: "",
        password2S: "",
        detailsS: ""
    }

    function $(node) {
        return document.querySelector(node)
    }

    async function buttonSignup(values) {
        try {
            const pL = {
                email: values.emailS,
                password: values.password1S,
                details: values.detailsS,
                name: values.nameS
            }
            const response = await Axios.post('/seller/signup', pL)
            if (response.status === 200) {
                setLogin(true)
                setPopup("Signed Up successfully!")

                history.push(from)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    async function buttonSignin(values) {
        try {
            const response = await Axios.post('/seller/login', values)
            if (response.status === 200) {
                setLogin(true)
                setPopup("Logged In successfully!")

                history.push(from)
            }

        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (<section>

        <div className="containerS">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn"></a></li>
                    </ul>
                </div>
                <div className="formParent">

                    <Formik
                        validationSchema={schema}
                        onSubmit={buttonSignin}
                        initialValues={initialValues}
                    >
                        <Fm className="form-signin" name="form">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Type</Form.Label>
                                    <Field
                                        tabIndex="1"
                                        type="text"
                                        placeholder="owner/seller"
                                        name="type"
                                        className="form-styling" />
                                    <ErrorMessage name="type" />

                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="2">
                                    <Form.Label>Email</Form.Label>
                                    <Field
                                        tabIndex="2"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        className="form-styling" />
                                    <ErrorMessage name="email" />

                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="3">
                                    <Form.Label>Password</Form.Label>
                                    <Field
                                        tabIndex="3"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        className="form-styling" />
                                    <ErrorMessage name="password" />

                                </Form.Group>
                            </Form.Row>

                            <Button className="btn btn-signup" tabIndex="4" type="submit">Sign In</Button>
                            <div className="forgot">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </Fm>
                    </Formik>
                </div>
            </div>
        </div>
    </section>)
}