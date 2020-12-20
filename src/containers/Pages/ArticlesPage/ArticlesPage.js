import React, {useState} from 'react';
import './ArticlesPage.scss';

import ArticleMainHeader from "../../../components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
import SearchBar from "../../../components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
import Articles from "../../ArticlesDirectory/Articles/Articles";
import Button from "../../../components/ArticlesDirectory/UIElements/Button/Button";
import {Route} from "react-router-dom";

const ArticlesPage = (props) => {
    const [buttonClickedName, setButtonClickedName] = useState("all-articles");

    const toolBarButtonClickedHandler = (buttonName) => {
        setButtonClickedName(buttonName);
    }
    return (
        <React.Fragment>
            <ArticleMainHeader
                Button1 = "All Articles"
                Button2 = "My Articles"
                Button3 = "Saved"
                page ={JSON.parse(localStorage.getItem("user")).username ? "user" : "no_user"}
                toolBarButtonClickedHandler = {toolBarButtonClickedHandler}
            />
            <SearchBar
                placeHolder="Ex. 10 business that grow exponentially"
            />
            <Articles
                setCommands={props.setCommands}
                {...props}
                buttonName = {buttonClickedName}/>
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