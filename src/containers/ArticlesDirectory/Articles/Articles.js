import React, {useState, useEffect} from 'react';
import './Articles.scss';
import axios from 'axios';

import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";

const Articles = (props) => {
    const [allArticles,manipulateArticles] = useState([]);

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

    const showBlogHandler = id => {
        const url = props.match.url + "/" + id;
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