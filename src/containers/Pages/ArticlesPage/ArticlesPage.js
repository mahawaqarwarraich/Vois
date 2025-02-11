import React, {useEffect, useState} from 'react';
import './ArticlesPage.scss';

import ArticleMainHeader from "../../../components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
import SearchBar from "../../../components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
import Articles from "../../ArticlesDirectory/Articles/Articles";
import Button from "../../../components/ArticlesDirectory/UIElements/Button/Button";
import {Route} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import MicIcon from '@material-ui/icons/Mic';
import AuthService from "../../../services/auth-service";

import LinearProgress from '@material-ui/core/LinearProgress';

const ArticlesPage = (props) => {
    //States Initialization for this component
    const [buttonClickedName, setButtonClickedName] = useState("all-articles");
    const [loading, setLoading] = useState(true);
    const [requestUrl, setRequestUrl] = useState("")

    /**
     * Handling loading state
     * Turn Loading ON
     * Turn Loading OFF
     * */
    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    const toolBarButtonClickedHandler = (buttonName) => {
        setButtonClickedName(buttonName);
    }
    console.log(props.match.params.userId);
    console.log(props.match.params.topicName);

    useEffect(()=> {
        const topic = props.match.params.topicName;
        console.log('from outer parent topic', topic)
        let url = "";
        console.log('user id from outer', props.match.params.userId)
        // if (AuthService.getCurrentUser().userId) {
        //     url = 'http://localhost:8000/get-all-user-articles/' + AuthService.getCurrentUser().userId;
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

        if (buttonClickedName === "all-articles") {
            url = 'http://localhost:8000/get-articles-by-topic/' + topic;
        }
        else if (buttonClickedName === "my-articles") {
            url = 'http://localhost:8000/get-articles-by-topic/' + topic + '/' + AuthService.getCurrentUser().userId;
        }
        console.log('urequest url', url)
        setRequestUrl(url)
    }, [buttonClickedName, props.buttonName, props.match.params.topicName, props.match.params.userId])

    return (
        <React.Fragment style={{position:"relative"}}>
            {loading ? <LinearProgress /> : ''}
            <ArticleMainHeader
                Button1 = "All Articles"
                Button2 = "My Articles"
                Button3 = "Saved"
                page ={JSON.parse(localStorage.getItem("user")).username ? "user" : "no_user"}
                fromProfile = {props.match.params.userId ? true : false}
                toolBarButtonClickedHandler = {toolBarButtonClickedHandler}
            />
            <SearchBar
                placeHolder="Ex. 10 business that grow exponentially"
            />
            <Articles
                showLoading={showLoading}
                hideLoading={hideLoading}
                setCommands={props.setCommands}
                {...props}
                buttonName = {buttonClickedName}
                url={requestUrl}
                />
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
            {/*{!props.match.params.userId && JSON.parse(localStorage.getItem("user")) ?*/}
            {/*    // <Fab color="secondary" aria-label="add" style={{position: "fixed", bottom: "5%", right: "5%"}}>*/}
            {/*    //     <AddIcon/>*/}
            {/*    // </Fab>*/}
            {/*    <Fab color="secondary" aria-label="add" style={{position: "fixed", bottom: "5%", right: "5%"}} variant="extended">*/}
            {/*        <MicIcon style={{marginRight:"0.7rem"}} />*/}
            {/*        Create New Article*/}
            {/*    </Fab>*/}
            {/*    : <></>*/}
            {/*}*/}

        </React.Fragment>
    );
}

export default ArticlesPage;