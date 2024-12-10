
import React, { useEffect } from "react";
import {useHistory } from "react-router-dom"; // Import useParams
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const EmailPage = (props) => {

    
   

    const commands = [
        {
            command: 'Sample command 1',
            description: 'Go to this page'
        },
        {
            command: 'Sample command 2',
            description: 'Go to this page'
        },
        {
            command: 'Sample command 3',
            description: 'Go to this page'
        }
    ];
   

    useEffect(() => {
        props.setCommands(commands);
    }, [commands, props]); // Empty dependency array ensures it runs only once

    return (
        <React.Fragment>
            <div style={{display:'flex',flexDirection: 'column', justifyContent:'center', alignItems:'center',paddingTop:'20px'}}>
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>Email Verified! </h1>
            <p>You can close this tab now! and got to previous tab...</p>
                </div>
           

        </React.Fragment>
    );
}

export default EmailPage;
