import React, {useEffect} from 'react';
import {useSpeechRecognition} from 'react-speech-recognition';

import './ArticleTopicsPage.scss';

import ArticleMainHeader from "../../../components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
import SearchBar from "../../../components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
import ArticleTopics from "../../ArticlesDirectory/ArticleTopics/ArticleTopics";
import Button from "../../../components/ArticlesDirectory/UIElements/Button/Button";

const ArticleTopicsPage = (props) => {
    const commands = [
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Goes back to the previous page'
        }
    ]

    const { transcript } = useSpeechRecognition({commands});

    const commandsAndDescription = [];

    commands.forEach(cmd => {
        commandsAndDescription.push({command: cmd.command, description: cmd.description});
    })

    useEffect(() => {
        props.setCommands(commandsAndDescription);
    }, [])
    return (
        <React.Fragment>
            <ArticleMainHeader
                Button1="All Topics"
                Button2="Popular"
                Button3="Trending"
            />
            <SearchBar
                placeHolder="Ex. Information Technlogy"
            />
            <ArticleTopics {...props}/>
            <div className="ArticleTopicsPage__Button">
                <Button
                    buttonText="Show More"
                    width="450px"
                    height="55px"
                    padding="18px 140px 18px 140px"
                    fontSize="19px"
                    borderRadius="10px"
                />
            </div>

        </React.Fragment>
    );
}

export default ArticleTopicsPage;