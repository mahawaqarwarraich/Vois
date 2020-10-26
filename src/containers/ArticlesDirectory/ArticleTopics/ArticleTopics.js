import React, { useEffect, useState } from 'react';
import './ArticleTopics.scss';
import axios from 'axios';

import ArticleTopicCard from "../../../components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";


const ArticleTopics = (props) => {

    const [articleTopics,manipulateArticleTopics] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8000/get-topics')
            .then(result => {
                const articleTopics = result.data.articleTopics;
                const tempArticleTopics = [];

                for (const topic in articleTopics) {
                    tempArticleTopics.push(articleTopics[topic]);
                }
                manipulateArticleTopics(tempArticleTopics);
            })
    },[]);

    const showArticlesByTopicHandler = topicName => {
        const url = props.match.url + "/" + topicName;
        props.history.push(url);
    }

    return (
        <div className="ArticleTopicsGrid">
            {articleTopics.map(articleTopic => {
                return (<div className="ArticleTopicsGrid__Card">
                    <ArticleTopicCard
                        key = {articleTopic._id}
                        topicName = {articleTopic.TopicName}
                        description = {articleTopic.Description}
                        picture = {articleTopic.PictureSecureId}
                        showArticlesByTopicsHandler = {() => showArticlesByTopicHandler(articleTopic.TopicName)}
                    />
                </div>)
            })}
        </div>
    );
}

export default ArticleTopics;
