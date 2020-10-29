import React, {useState, useEffect} from 'react';
import './Articles.scss';
import axios from 'axios';
import {useSpeechRecognition} from "react-speech-recognition";

import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";

const Articles = (props) => {
    const [allArticles,manipulateArticles] = useState([]);


    const commands = [
        {
            command: 'open *',
            callback: (articleTitle) => showBlogByVoiceHandler(articleTitle),
        },
        {
            command: 'go back',
            callback: () => props.history.goBack(),
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

    useEffect(() => {
        const topic = props.match.params.topicName;
        axios.get('http://localhost:8000/get-articles-by-topic/' + topic)
            .then(result => {
                const articles = result.data.articles;
                const tempArticles = [];

                for (const article in articles) {
                    tempArticles.push(articles[article]);
                }
                manipulateArticles(tempArticles);
            })
    }, [])


    const showBlogByVoiceHandler = articleTitle => {
        console.log(articleTitle);
        articleTitle = articleTitle.toLowerCase();

        allArticles.forEach(article => {
            if (article.Title.toLowerCase() == articleTitle) {
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
                    title = {article.Title}
                    body = {article.Body}
                    cover = {article.PictureSecureId}
                    date = {article.PostedOn}
                    showBlogHandler = {() => showBlogHandler(article._id)}
                />
            ))}
        </div>
    );
}

export default Articles;