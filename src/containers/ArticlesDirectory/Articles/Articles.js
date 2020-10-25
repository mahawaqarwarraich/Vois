import React, {useState, useEffect} from 'react';
import './Articles.scss';
import axios from 'axios';

import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";

const Articles = (props) => {
    const [allArticles,manipulateArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/get-all-articles')
            .then(result => {
                //console.log(articles.data.articles);
                const articles = result.data.articles;
                const tempArticles = [];

                for (const article in articles) {
                    console.log(articles[article]);
                    tempArticles.push(articles[article]);
                }
                manipulateArticles(tempArticles);
            })
    }, [])

    return (
        <div className="AllArticles">

            {allArticles.map(article => (
                <ArticleListItem
                    key={article._id}
                    title = {article.Title}
                    body = {article.Body}
                    cover = {article.PictureSecureId}
                    date = {article.PostedOn}
                />
            ))}
        </div>
    );
}

export default Articles;