import React, { useEffect, useState } from 'react';
import './ArticleTopics.scss';
import axios from 'axios';

import {useSpeechRecognition} from "react-speech-recognition";
import ArticleTopicCard from "../../../components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";


const ArticleTopics = (props) => {
    //States Initialization for this component
    const [articleTopics,manipulateArticleTopics] = useState([]);

    //Registered voice commads for this article
    const commands = [
        {
            command: 'Create new article.',
            callback: () => props.history.push('/new-article'),
            description: 'Opens the text editor to create a new article',
        },
        {
            command: 'Open user profile.',
            callback: () => props.history.push(`/profile/${JSON.parse(localStorage.getItem("user")).userId}`),
            description: 'Opens user profile',
        },
        {
            command: 'Go back.',
            callback: () => props.history.goBack(),
            description: "Goes back to the previous page",
        },
        {
            command: 'Open *.',
            callback: (articleTopic) => showArticlesByTopicHandler(articleTopic),
            description: 'Opens an article topic'
        },
        {
            command: 'Search.',
            callback: () => {props.history.push(`${props.match.url}/All%20Articles/search`)},
            description: 'Search in the entire directory'
        },
        {
            command: 'Scroll down.',
            callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"})
        },
        {
            command: 'Scroll up.',
            callback: () => window.scrollTo({top: window.pageYOffset-500,behavior:"smooth"})
        }
    ];

    //On componentDidMount, set the new commands in the sidebar
    useEffect(() => {
        props.setCommands(commands);
    }, [commands, props])
////yeh haiiiiiiiiiiiiiiiiiiiiiiiii
    const { transcript } = useSpeechRecognition({commands});
    console.log("yahan dot hai kya?", transcript)

    //On componentDidMount, get all the topics in the articles directory
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


    //Open articles of the selected topic
    const showArticlesByTopicHandler = topicName => {
        let isAvailable;
        articleTopics.forEach(articleTopic => {
            if (articleTopic.TopicName.toLowerCase() == topicName.toLowerCase()) {
                topicName = articleTopic.TopicName;
                isAvailable = true;
            }
        });
        if (isAvailable) {
            const url = props.match.url  + "/" + topicName;
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
