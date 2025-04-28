import React, {useEffect} from 'react';
import Header from "../../components/PortfolioBuilder/Header/Header";
import About from "../../components/PortfolioBuilder/About/About";
import Skills from "../../components/PortfolioBuilder/Skills/Skills";
import Details from "../../components/PortfolioBuilder/Details/Details";
import Footer from "../../components/PortfolioBuilder/Footer/Footer";
import { useLocation } from 'react-router-dom';
import {useSpeechRecognition} from "react-speech-recognition";
import RecentWork from "../../components/PortfolioBuilder/RecentWork/RecentWork";
import axios from "axios";

const BMHPortfolio = (props) => {
    const location = useLocation();
    const portfolioData = location.state?.portfolioData;
    const parsedData = JSON.parse(portfolioData.PortfolioData);
    console.log("parsed data", parsedData)

    const commands = [
        {
            command: 'Go back.',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'View resume.',
            callback: () => {
                window.location.href = 'http://localhost:3001?id=' + JSON.parse(localStorage.getItem("user")).userId + `&tok=${JSON.parse(localStorage.getItem("user")).token}&preview=true`;
            }
        }
        ,
        {
            command: 'Scroll down.',
            callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"}),
        },
        {
            command: 'Scroll up.',
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
    }, [commandsAndDesc, props])


    return (
        <div>
            <Header headerName={parsedData?.headername}/>
            <About about={parsedData?.aboutParagraph}/>
            <RecentWork />
            <Skills skillss={parsedData?.skills}/>
            <Details email={parsedData?.email}/>
            <Footer/>
        </div>
    );
};

export default BMHPortfolio