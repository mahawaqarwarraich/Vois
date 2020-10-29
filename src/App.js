import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {Route} from 'react-router-dom';

import HomePage from "./containers/Pages/HomePage";
// import ArticleTopicCard from "./components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";
// import ArticleListItem from "./components/ArticlesDirectory/ArticleListItem/ArticleListItem";
// import ArticleMainHeader from "./components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
// import SearchBar from "./components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
// import ArticleTopics from "./containers/ArticlesDirectory/ArticleTopics/ArticleTopics";
import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
import TextEditor from "./containers/TextEditor";
// import Articles from "./containers/ArticlesDirectory/Articles/Articles";
import BlogManager from "./containers/Blog/BlogManager";
// import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
import Articles from "./containers/ArticlesDirectory/Articles/Articles";
import ArticlesPage from "./containers/Pages/ArticlesPage/ArticlesPage";
import Sidebar from "./containers/Sidebar";


import './App.css';

function App(props) {

    useEffect(() => {
        SpeechRecognition.startListening({continuous: true});
    }, [])


    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert('can not use speech recognition...')
    }

    const [sidebar, setSidebar] = useState('');

    const [setSidebarState, setsetSidebarState] = useState(null);

    const setSidebarStateFunc = setSidebarStateFunc => {
        setsetSidebarState(prevState => {
            return setSidebarStateFunc;
        });
    };


    return (
        <>
            <div className="App">
                {/*<HomePage />*/}
                {/*<ArticleTopicCard />*/}
                {/*<ArticleListItem />*/}
                {/*<ArticleMainHeader />*/}
                {/*<SearchBar />*/}
                {/*<ArticleTopics />*/}
                {/*<ArticleTopicsPage />*/}
                {/*<Articles />*/}
                {/*<ArticlesPage />*/}
                {/*<TextEditor/>*/}

                <div style={{width: '15%',maxHeight:'100vh', overflow: 'auto', borderRight: '1.5px solid #d3d3d3'}}><Sidebar setsetStateFunc={setSidebarStateFunc}/></div>
                <div style={{width: '85%'}}>{setSidebarState ?
                    (<React.Fragment>
                            <Route path="/text-editor" render={props => <TextEditor
                                setCommands={newState => setSidebarState(newState)}
                                {...props} />}/>
                            <Route path="/blog" exact render={props => <BlogManager
                                setCommands={newState => setSidebarState(newState)}
                                {...props} />}/>
                            <Route path="/articles-directory" exact render={props => <ArticleTopicsPage
                                setCommands={newState => setSidebarState(newState)}
                                {...props} />}/>
                            <Route path="/articles-directory/:topicName" exact
                                   render={props => <ArticlesPage
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props}/>}/>
                            <Route path="/" exact
                                   render={props => <HomePage
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props} />}/>
                        </React.Fragment>
                    )
                    : ''}


                </div>
            </div>

        </>
    );
}

export default App;
