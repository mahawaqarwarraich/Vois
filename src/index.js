import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from "notistack";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import { AppProvider } from './context/AppContext'; 

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* Initialize ReactNotifications to make notifications work across the app */}
            <ReactNotifications />
            <SnackbarProvider maxSnack={3}>
            <AppProvider>
                <App />
                </AppProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
