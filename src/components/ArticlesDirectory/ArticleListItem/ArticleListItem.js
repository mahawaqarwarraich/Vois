import React from 'react';
import './ArticleListItem.scss';

import Button from "../UIElements/Button/Button";


const ArticleListItem = (props) => (
    <div className="ArticleListItem">
        <div className="ArticleListItem__Img">

        </div>
        <div className="ArticleListItem__Content">
            <h1 className="ArticleListItem__Content--Heading">
                10 Business Tricks Every Business Man Should Know
            </h1>
            <p className="ArticleListItem__Content--Paragraph">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage ...
            </p>

            <div className="ArticleListItem__Content--DateAndButtonDiv">
                <p className="ArticleListItem__Content--DateAndButtonDiv-PublishedDate">
                    Oct 18 - 3:24 PM
                </p>

                <Button
                    buttonText="Explore"
                    width = "132px"
                    height = "36px"
                    padding = "7px 28px 7px 28px"
                    fontSize = "15px"
                />
            </div>


        </div>
    </div>
);

export default ArticleListItem;