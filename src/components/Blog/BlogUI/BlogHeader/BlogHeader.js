import React, {useContext} from "react";

import BlogSignatureHeading from "../../../../components/UIWidgets/Typography/BlogSignatureHeading";
import DotList from "../../../../components/UIWidgets/DotList";

import ThemeContext from "../../../../contexts/ThemeContext";

import "./style.scss";

function BlogHeader(props) {
    const theme = useContext(ThemeContext);
    const currTheme = "blue";

    return (
        <React.Fragment>
            <div
                style={{backgroundImage: `url(${props.config.imageURL})`}}
                className="blog-header blog-header--pixel"
            >
                {props.config.showCoverImageSelectorButton ?
                    <button style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#4285f4',
                        border: 0,
                        borderRadius: '4px',
                        padding: '7px 18px',
                        color: '#fff',
                    }} onClick={props.config.setShowCoverImageSelector}>Set cover image
                    </button>
                    : ''}

                <div style={{color: theme[currTheme].color}} className="blog-title">
                    <div className="blog-title--heading">
                        <BlogSignatureHeading theme={currTheme}>
                            {props.config.title}
                        </BlogSignatureHeading>
                    </div>
                    <div className="blog-authored">
                        <DotList items={[props.config.author, props.config.createdOn]}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BlogHeader;
