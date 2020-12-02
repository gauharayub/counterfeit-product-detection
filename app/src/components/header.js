//libraries
import { useState, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import Axios from '../store/axiosInstance'

//css
import '../static/css/header.css'
import '../static/css/hamMenuAnimation.css'

//#region images
import logo from '../static/images/urbansetu.png'

import homeIco from '../static/images/nav/home.svg'
import locaIco from '../static/images/nav/location.png'
import userIco from '../static/images/nav/user.svg'
import vendorIco from '../static/images/nav/vendor.svg'

//#endregion

//global state store
import { login as ll } from '../store/atoms'



function Header() {

    const [open, setOpen] = useState(false)
    const [login, setLogin] = useRecoilState(ll)
    const history = useHistory()

    useEffect(async () => {
        try {
            const response = await Axios.get('/tokenVerify')
            if (response.status === 200) {
                console.log("Token verified")
                setLogin(true)
            }

        }
        catch (error) {
            console.log(error.message)
        }
    }, [])
    //function to set ham menu open and close
    function hamOpener() {
        let list = document.querySelector('.nav-items')
        let ham = document.querySelector('.nav-icon')
        ham.classList.toggle('openHam')

        if (!open) {
            list.style.display = 'flex';

        }
        else {
            list.style.display = 'none';
        }
        setOpen(!open)
    }

    async function logout() {
        try {
            const response = await Axios.get('/seller/logout')
            console.log("logout resposne", response);
            setLogin(false)
            if (response.status === 200) {
                history.replace('/')
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <header className="App-header">
            <nav className="navbar ">
                <div className="NavbarBrand">
                    <div id="logo">
                        <Link to='/'> <img src={logo} className="img-fluid LogoImg" alt="logo" /></Link>
                    </div>


                    <div className="pincodeContainer d-flex">
                        <span className="LocationImage">
                            <img src={locaIco} alt="location icon" />
                        </span>
                        <span className="location">
                            <Link to='/buy'>
                                <span>
                                    <h6 className="ml-2">
                                        Enter secret key here!
                                </h6>
                                </span>
                            </Link>
                        </span>
                    </div>
                </div>

                <div className='nav-items mx-auto'>
                    <span className="d-flex">
                        <Link to='/'><span><img src={homeIco} alt="home icon" />
                            <h5 className="ml-2">
                                Home
                            </h5></span>
                        </Link>
                    </span>
                    <span>
                        {login
                            ? <Link to='/profile'><span><img src={userIco} alt="user icon" /><h5 className="ml-2"> Profile</h5></span></Link>
                            : <Link to='/login'><span><img src={userIco} alt="user icon" /><h5 className="ml-2"> Login/Signup </h5></span></Link>
                        }
                    </span>

                    {login ? <span>
                        <div onClick={logout}>
                            <span>
                                <img src={vendorIco} alt="vendor icon" />
                                <h5 className="ml-2">Logout</h5>
                            </span>

                        </div>
                    </span> : ''}

                </div>

                <div onClick={hamOpener} id="hamMenu">
                    <div className="nav-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

            </nav>
        </header>)
}

export default Header