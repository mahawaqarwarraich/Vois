import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import _ from 'lodash';

import tabsConfig from './tabsConfig';

import HomePage from "../../../components/HomePage";

function HomePageManager(props) {

    const [tabsConfigState, setTabsConfigState] = useState([...(tabsConfig.tabs)]);
    const urlForCmd = {};
    tabsConfig.tabs.forEach(tab => {
        urlForCmd[tab.cmdSlice.toLowerCase()] = {
            url: tab.goTo
        }
    });

    const handleNavigation = (base, cmd) => {
        console.log(urlForCmd[cmd.toLowerCase()] ? urlForCmd[cmd.toLowerCase()].url : 'Unknown Command : ' + cmd);
        if (urlForCmd[cmd.toLowerCase()]) {
            let cmdArray = cmd.toLowerCase().split(' ');
            base = base.toLowerCase();
            const targetCmd = base + " " + cmd;
            let tabsConfigCopy = _.cloneDeep(tabsConfig);
            tabsConfig.tabs.forEach((tab, index) => {
                if (tab.cmd.toLowerCase() === targetCmd.toLowerCase())
                    tabsConfigCopy.tabs[index].hover = true;
            });
            setTabsConfigState([...(tabsConfigCopy.tabs)]);
        }
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

    useEffect(() => {
        SpeechRecognition.startListening({continuous: true});
        console.log("hello")
    }, [])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }


    return (

        <HomePage config={{tabs: [...tabsConfigState]}}/>

    );

}

export default HomePageManager;