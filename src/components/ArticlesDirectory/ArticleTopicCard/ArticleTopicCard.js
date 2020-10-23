import React from 'react';
import './ArticleTopicCard.scss';

import Button from "../UIElements/Button/Button";

const ArticleTopicCard = (props) => (
    <div className="ArticleTopicCard">
        <div className="ArticleTopicCard__Img">
        </div>

        <div className="ArticleTopicCard__Content">
            <h1 className="ArticleTopicCard__Content--Heading">
                Business
            </h1>
            <p className="ArticleTopicCard__Content--Paragraph">
                Keep yourself updated with most successful business and business ideas
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
);

export default ArticleTopicCard;