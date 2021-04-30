import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from "notistack";
import EyeGaze from './components/EyeGaze/EyeGaze';
import Header from './components/PortfolioBuilder/Header/Header';
import About from './components/PortfolioBuilder/About/About';
import Details from './components/PortfolioBuilder/Details/Details';
import Skills from './components/PortfolioBuilder/Skills/Skills';
import RecentWork from './components/PortfolioBuilder/RecentWork/RecentWork';
import Footer from './components/PortfolioBuilder/Footer/Footer';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
             <App/>
             {/*<EyeGaze />*/}
            {/*<Header />*/}
            {/*<About />*/}
            {/*<RecentWork />*/}
            {/*<Skills />*/}
            {/*<Details />*/}
            {/*<Footer />*/}
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
