import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <h3 className="header__insertbackground">
                Say *Search Background Images*
            </h3>
            <div className="header__info">
                <h1 className="header__name">
                    *SET NAME YOURNAME*
                </h1>
                <h2 className="header__tagline">
                    *SET TAGLINE YOUR TAGLINE*
                </h2>
            </div>
        </div>
    )
}

export default Header
