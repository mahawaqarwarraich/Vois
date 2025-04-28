import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import _ from 'lodash';

import tabsConfig from './tabsConfig';

import HomePage from "../../../components/HomePage";

function HomePageManager(props) {

    const [tabsConfigState, setTabsConfigState] = useState([...(tabsConfig.tabs)]); // may: array of objects
    const urlForCmd = {};
    const commandsAndDesc = [];

    tabsConfig.tabs.forEach(tab => {
        urlForCmd[tab.cmdSlice.toLowerCase()] = {
            url: tab.goTo
        }
        console.log("here is command object" , urlForCmd)
        commandsAndDesc.push({command: tab.cmd, description: tab.cmdDesc});
    });

    const handleNavigation = (base, cmdT) => {
        let msg = "hello";
        const cmd = cmdT.replace(/[.]/g, '');
        console.log("here is the cmd", cmd);
        console.log(urlForCmd[cmd.toLowerCase()] ? urlForCmd[cmd.toLowerCase()].url : 'Unknown Command : ' + cmd);
        let gotourl = '';
        if (urlForCmd[cmd.toLowerCase()]) {
            let cmdArray = cmd.toLowerCase().split(' ');
            base = base.toLowerCase();
            const targetCmd = base + " " + cmd;
            let tabsConfigCopy = _.cloneDeep(tabsConfig);
            tabsConfig.tabs.forEach((tab, index) => {
                if (tab.cmd.toLowerCase() === targetCmd.toLowerCase()) {
                    tabsConfigCopy.tabs[index].hover = true;
                    gotourl = tab.goTo;
                }
            });
            setTabsConfigState([...(tabsConfigCopy.tabs)]);
        }
        setTimeout(() => {
            if (gotourl !== '/cv-builder')
                props.history.push(gotourl)
            else
                window.location.href = 'http://localhost:3001?id=' + JSON.parse(localStorage.getItem("user")).userId + `&tok=${JSON.parse(localStorage.getItem("user")).token}`;
        }, 800)
    }

    const {resetTranscript} = useSpeechRecognition();

    const commands = [
        {
            command: 'Navigate *',
            callback: cmd => handleNavigation('Navigate', cmd)
        },
        {
            command: 'remove',
            callback: ({resetTranscript}) => resetTranscript()
        }
    ];

    const {transcript} = useSpeechRecognition({commands});
    console.log("hello")
    console.log('transcript', transcript)

    useEffect(() => {
        if (props.setCommands)
            props.setCommands(commandsAndDesc);

    }, [commandsAndDesc, props])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }


    return (

        <HomePage config={{tabs: [...tabsConfigState]}} setCommands={props.setCommands}/>

    );

}

export default HomePageManager;