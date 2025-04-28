import React from 'react'
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">
                {/*&copy; Copyright 2021 {JSON.parse(localStorage.getItem("user")).name}*/}
                &copy; Copyright 2025 VOIS
            </p>
        </footer>
    )
}

export default Footer
