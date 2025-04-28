import React, { useEffect, useState } from 'react';
import Header from "../../components/PortfolioBuilder/Header/Header";
import About from "../../components/PortfolioBuilder/About/About";
import Skills from "../../components/PortfolioBuilder/Skills/Skills";
import Details from "../../components/PortfolioBuilder/Details/Details";
import Footer from "../../components/PortfolioBuilder/Footer/Footer";
import { useLocation } from 'react-router-dom';
import { useSpeechRecognition } from "react-speech-recognition";
import RecentWork from "../../components/PortfolioBuilder/RecentWork/RecentWork";
import axios from "axios";
import authHeader from '../../services/auth-header'; // make sure this path is correct

const BMHMyPortfolio = (props) => {
    const [portfolios, setPortfolios] = useState([]);

    const commands = [
        {
            command: 'Go back.',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'Open file *',
            callback: (flname) => {
                const foundPortfolio = portfolios.find(item => {
                    try {
                        const data = JSON.parse(item.PortfolioData);
                        return data.filename === flname;
                    } catch (error) {
                        console.error("Error parsing PortfolioData:", error);
                        return false;
                    }
                });
            
                if (foundPortfolio) {
                    props.history.push({
                        pathname: `/portfolio/${foundPortfolio.Author.id}`,
                        state: { portfolioData: foundPortfolio }
                    });
                } else {
                    console.log("No portfolio found with filename:", flname);
                }
            },


            description: 'Opens the respective portfolio web page.',
        },
        {
            command: 'Scroll down.',
            callback: () => window.scrollTo({ top: window.pageYOffset + 500, behavior: "smooth" }),
        },
        {
            command: 'Scroll up.',
            callback: () => window.scrollTo({ top: window.pageYOffset - 500, behavior: "smooth" })
        }
    ];

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });

    useEffect(() => {
        const commandsAndDesc = commands.map(cmd => ({
            command: cmd.command,
            description: cmd.description
        }));

        if (props.setCommands) {
            props.setCommands(commandsAndDesc);
        }
    }, [commands, props]);


    useEffect(() => {
        const userString = localStorage.getItem("user");
        const usr = userString ? JSON.parse(userString) : null;
        console.log("mein he to usr hn", usr)
        console.log("chupa hua username", usr.username)

       const userId = usr ? usr.userId: null;

        if (userId) {
            axios.get(`http://localhost:8000/get-portfolios/${userId}`, {
                headers: authHeader(),
            })
                .then(res => {
                    console.log('portfolios', res)
                    setPortfolios(res.data.portfolio); // assuming res.data is an array
                    const pd_string = res.data.portfolio.PortfolioData; // pd means portfolio data
                    console.log("mein portfolio data hn", pd_string)
                    // const pd_obj = JSON.parse(pd_string);
                    // console.log("pd object", pd_obj)
                })
                .catch(err => {
                    console.error("Error fetching portfolios:", err);
                });
        }
    }, [
    ]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>My Portfolios</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {portfolios.length === 0 ? (
                    <li>No portfolios found.</li>
                ) : (
                    portfolios.map((portfolio, index) => (
                        <li key={index} style={{
                            padding: "10px 15px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            backgroundColor: "#f9f9f9"
                        }}>
                            <strong>{JSON.parse(portfolio.PortfolioData).filename}</strong><br />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default BMHMyPortfolio;
