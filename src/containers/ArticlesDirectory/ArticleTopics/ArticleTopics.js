import React from 'react';
import './ArticleTopics.scss';

import ArticleTopicCard from "../../../components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";


const ArticleTopics = (props) => {
    return (
        <div className="ArticleTopicsGrid">
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
            <div className="ArticleTopicsGrid__Card">
                <ArticleTopicCard />
            </div>
        </div>
    );
}

export default ArticleTopics;
