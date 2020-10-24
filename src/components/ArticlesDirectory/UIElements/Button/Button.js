import React from 'react';
import "./Button.scss";


const Button = (props) => (
    <button className="ArticlesDirectoryButton"
            style={{
                width: props.width,
                height: props.height,
                padding: props.padding,
                fontSize: props.fontSize,
                borderRadius: props.borderRadius,
            }}>
        {props.buttonText}
    </button>
);

export default Button;