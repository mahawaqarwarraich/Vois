import React, { useEffect, useState } from 'react';
import './ArticleTopics.scss';
import axios from 'axios';

import {useSpeechRecognition} from "react-speech-recognition";
import ArticleTopicCard from "../../../components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";


const ArticleTopics = (props) => {

    const [articleTopics,manipulateArticleTopics] = useState([]);


    const commands = [
        {
            command: 'open *',
            callback: (articleTopic) => showArticlesByTopicHandler(articleTopic),
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"})
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset-500,behavior:"smooth"})
        }
    ];

    const { Transcript } = useSpeechRecognition({commands});

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
        let isAvailable;
        articleTopics.forEach(articleTopic => {
            if (articleTopic.TopicName.toLowerCase() == topicName.toLowerCase()) {
                topicName = articleTopic.TopicName;
                isAvailable = true;
            }
        });
        if (isAvailable) {
            const url = props.match.url + "/" + topicName;
            props.history.push(url);
        }
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
