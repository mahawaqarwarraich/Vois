import React, { useEffect } from "react";
import {useHistory } from "react-router-dom"; // Import useParams
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const EmailPage = (props) => {

    
    const history = useHistory();
    const location = useLocation();
    const { email } = location.state || {};  // Safely access the email
    console.log(email)

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
    useEffect( ()=> {
       
        const makeRequest = async () => {
            try {
                
              const response = await axios.post(`http://localhost:8000/send-verification-email`, {email});
              console.log('response', response)
              if (response.data.success) {
                history.push('/facial-login');
              }
            } catch (error) {
              console.error('Error making request:', error);
              // Handle error case here (e.g., show error message)
            }
          };
      
          makeRequest();
    },[email, history])

    useEffect(() => {
        props.setCommands(commands);
    }, [commands, props]); // Empty dependency array ensures it runs only once

    return (
        <React.Fragment>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',paddingTop:'20px'}}>
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>To Continue, Click the link send to {email} </h1>
                </div>
           

        </React.Fragment>
    );
}

export default EmailPage;
