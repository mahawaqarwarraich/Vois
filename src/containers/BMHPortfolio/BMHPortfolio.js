import React, {useEffect} from 'react';
import Header from "../../components/PortfolioBuilder/Header/Header";
import About from "../../components/PortfolioBuilder/About/About";
import Skills from "../../components/PortfolioBuilder/Skills/Skills";
import Details from "../../components/PortfolioBuilder/Details/Details";
import Footer from "../../components/PortfolioBuilder/Footer/Footer";

import {useSpeechRecognition} from "react-speech-recognition";
import RecentWork from "../../components/PortfolioBuilder/RecentWork/RecentWork";
import axios from "axios";

const BMHPortfolio = (props) => {

    const commands = [
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'view resume',
            callback: () => {
                window.location.href = 'http://localhost:3001?id=' + JSON.parse(localStorage.getItem("user")).userId + `&tok=${JSON.parse(localStorage.getItem("user")).token}&preview=true`;
            }
        }
        ,
        {
            command: 'scroll down',
            callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"}),
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset-500,behavior:"smooth"})
        }
    ];

    let commandsAndDesc = [];

    const {transcript, resetTranscript} = useSpeechRecognition({commands});

    commands.forEach(cmd => {
        commandsAndDesc.push({command: cmd.command, description: cmd.description})
    })

    useEffect(() => {
        if (props.setCommands)
            props.setCommands(commandsAndDesc);
    }, [])


    return (
        <div>
            <Header/>
            <About/>
            <RecentWork />
            <Skills/>
            <Details email={'muzamilhussain@gmail.com'}/>
            <Footer/>
        </div>
    );
};

export default BMHPortfolio