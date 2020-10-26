import React from 'react';
import './ArticlesPage.scss';

import ArticleMainHeader from "../../../components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
import SearchBar from "../../../components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
import Articles from "../../ArticlesDirectory/Articles/Articles";
import Button from "../../../components/ArticlesDirectory/UIElements/Button/Button";
import {Route} from "react-router-dom";

const ArticlesPage = (props) => {
    return (
        <React.Fragment>
            <ArticleMainHeader
                Button1 = "Published"
                Button2 = "Saved"
                Button3 = "Drafts"
            />
            <SearchBar
                placeHolder="Ex. 10 business that grow exponentially"
            />
            <Articles {...props} />
            <div className="ArticleTopicsPage__Button">
                <Button
                    buttonText="Show More"
                    width = "450px"
                    height = "55px"
                    padding = "18px 140px 18px 140px"
                    fontSize = "19px"
                    borderRadius = "10px"
                />
            </div>

        </React.Fragment>
    );
}

export default ArticlesPage;