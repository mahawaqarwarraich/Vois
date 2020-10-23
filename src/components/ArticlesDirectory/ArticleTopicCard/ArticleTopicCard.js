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
            width = "100px"
            height = "24px"
            padding = "5px 22px 5px 22px"
            fontSize = "10px"
            borderRadius = "5px"
            />
        </div>
    </div>
);

export default ArticleTopicCard;