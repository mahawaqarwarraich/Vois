import React, {useContext} from 'react';

import ThemeContext from "../../../contexts/ThemeContext";

import './style.scss';

function PageCard(props) {

    const theme = useContext(ThemeContext);

    return (
        <div style={{transform: props.config.hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform .2s ease-in'}} className="page-card">
            <div className="page-card-meta page-card-meta--header">
                <div className="card-hero-icon">
                    <img src={props.config.heroImgSrc} alt={props.config.title + ' icon'} width="100%"/>
                </div>
                <div className="card-content">
                    <div className="card-content--title">
                        <h1 className="title-heading-black">
                            {props.config.title}
                        </h1>
                    </div>
                    <div className="card-content--desc">
                        <p className="card-desc">
                            {props.config.desc}
                        </p>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: theme[props.config.theme].hex}}
                 className="page-card-meta page-card-meta--cmd">
                <div className="page-card-meta--cmd-icon">
                    <img src={props.config.cmdImgSrc} alt={props.config.title + ' Command Indication Icon'} width='100%'/>
                </div>
                <p className="page-card-meta--cmd-text">{props.config.cmd}</p>
            </div>
        </div>
    );

};

export default PageCard;