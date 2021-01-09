import React from 'react';
import QRCode from "react-qr-code";

// css
import '../static/css/info.scss';

export default function ProductQrCode() {
    const productId = window.location.pathname.split('/')[2];
    return (
        <div className="center-elements">
            <h2 className = "center-heading message-heading">PRODUCT ADDED SUCCESSFULLY !</h2>
            <div className="qrcode-container">   
                <QRCode value={productId} />
            </div>
            <h2 className="message-heading">PRODUCT QR CODE</h2>
        </div>
    );
}