import React from 'react';
import './Header.scss';

const Header = ({headerName}) => {
    console.log("yahan aya", headerName)

    return (
        <div className="header">
            <h3 className="header__insertbackground">
                {/*Say *Search Background Images**/}
            </h3>
            <div className="header__info">
                <h1 className="header__name">
                   {headerName || "My name"}
                </h1>
                <h2 className="header__tagline">
                    I AM A WEB DEVELOPER
                </h2>
            </div>
        </div>
    )
}

export default Header
