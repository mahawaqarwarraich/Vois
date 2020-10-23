import React from 'react';
import './Articles.scss';

import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";

const Articles = (props) => {
    return (
        <div className="AllArticles">
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
            <ArticleListItem />
        </div>
    );
}

export default Articles;