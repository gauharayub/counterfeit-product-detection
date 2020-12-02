import React,{useState,useEffect} from 'react';
import { CSSTransition } from 'react-transition-group'
import './static/css/pops.scss'
import './static/css/ReactTransitions.css'

import { useRecoilState } from 'recoil'
import { popups as pp } from './store/atoms'
function Pops() {

    const [popup, setPopup] = useRecoilState(pp)
    const [show, setShow] = useState(false)
    
    //function to clear popup content after animatio ends
    function clearPopup() {
        setShow(false)
        setTimeout(() => {
            setPopup('')
        },300)
    }
    useEffect(() => {
        if (popup) {
            setShow(true)
            //popup clear after 3 sec
            setTimeout(() => {
                clearPopup()
            },3000)
        }
    },[popup])
    return (
        <div id="popupContainer">

            <CSSTransition
                in={show}
                classNames="popup"
                timeout={300}
                unmountOnExit
                >
                <p>{popup} <button value={popup} onClick={clearPopup} className="close">X</button></p>
            </CSSTransition>
        </div>
    )
}

export default Pops