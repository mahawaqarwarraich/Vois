import React, { useState, useEffect } from 'react';
import './Articles.scss';
import axios from 'axios';
import { useSpeechRecognition } from "react-speech-recognition";
import AuthService from "../../../services/auth-service";
import { Route } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';


import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";

const Articles = (props) => {
    //State Initialization for this component
    const [allArticles, manipulateArticles] = useState([]);

    //Registered Voice Commands for this component
    const commands = [
        {
            command: 'open *',
            callback: (articleTitle) => showBlogByVoiceHandler(articleTitle),
            description: 'Opens an article'
        },
        {
            command: 'search',
            callback: () => { props.history.push(`${props.match.url}/search`) },
            description: 'Search in this directory'
        },
        {
            command: 'go back',
            callback: () => {
                console.log("Go back command triggered");  // Debugging
                props.history.goBack();

            },
            description: "Goes back to the previous page",
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo({ top: window.pageYOffset + 500, behavior: "smooth" })
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({ top: window.pageYOffset - 500, behavior: "smooth" })
        }
    ];


    const { transcript } = useSpeechRecognition({ commands });

    console.log(transcript)

    //Load the articles of the category under focus i.e. All Articles or My Articles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.showLoading) props.showLoading();
        props.setCommands(commands);
        const topic = props.match.params.topicName;
        console.log('topic name from innermost element:', topic)
        console.log('user id from innner', props.match.params.userId)
        // let url = "";
        // if (props.match.params.userId) {
        //     url = 'http://localhost:8000/get-all-user-articles/' + props.match.params.userId;
        // } else {
        //     if (props.buttonName === "all-articles") {
        //         url = 'http://localhost:8000/get-articles-by-topic/' + topic;
        //     }
        //     else if (props.buttonName === "my-articles") {
        //         url = 'http://localhost:8000/get-articles-by-topic/' + topic + '/' + AuthService.getCurrentUser().userId;
        //     }
        //     else {

        //     }
        // }
        console.log('where wwe want url', props.url)
        axios.get(props.url)
            .then(result => {
                const articles = result.data.articles;
                const tempArticles = [];

                for (const article in articles) {
                    tempArticles.push(articles[article]);
                }
                manipulateArticles(tempArticles);
                if (props.hideLoading) props.hideLoading();
            })
            .catch(err => {
                console.log(err);
            });
    }, [commands, props.match.params.topicName, props.match.params.userId, props.showLoading, props.hideLoading, manipulateArticles, props]);

    //Open an article by passing its id to the article viewer route
    const showBlogByVoiceHandler = articleTitle => {
        console.log("i am in the blog")
        console.log(articleTitle);
        articleTitle = articleTitle.toLowerCase();

        allArticles.forEach(article => {
            if (article.Title.toLowerCase() === articleTitle) {
                const url = "/article/" + article._id;
                props.history.push(url);
            }
        })
    }

    const showBlogHandler = id => {
        const url = "/article/" + id;
        props.history.push(url);
    }
    return (
        <div className="AllArticles">
            {allArticles.map(article => (
                <ArticleListItem
                    key={article._id}
                    title={article.Title}
                    body={EditorState.createWithContent(convertFromRaw(JSON.parse(article.Body)))}
                    cover={article.PictureSecureId}
                    date={article.PostedOn}
                    showBlogHandler={() => showBlogHandler(article._id)}
                />
            ))}
        </div>
    );
}

export default Articles;