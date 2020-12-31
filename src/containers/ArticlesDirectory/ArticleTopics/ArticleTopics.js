import React, { useEffect, useState } from 'react';
import './ArticleTopics.scss';
import axios from 'axios';

import {useSpeechRecognition} from "react-speech-recognition";
import ArticleTopicCard from "../../../components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";


const ArticleTopics = (props) => {

    const [articleTopics,manipulateArticleTopics] = useState([]);

    const commands = [
        {
            command: 'create new article',
            callback: () => props.history.push('/new-article'),
            description: 'Opens the text editor to create a new article',
        },
        {
            command: 'open user profile',
            callback: () => props.history.push('/profile/5fdd051402816535287cb8fa'),
            description: 'Opens user profile',
        },
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: "Goes back to the previous page",
        },
        {
            command: 'open *',
            callback: (articleTopic) => showArticlesByTopicHandler(articleTopic),
            description: 'Opens an article topic'
        },
        {
            command: 'search',
            callback: () => {props.history.push(`${props.match.url}/All%20Articles/search`)},
            description: 'Search in the entire directory'
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

    useEffect(() => {
        props.setCommands(commands);
    }, [])

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
