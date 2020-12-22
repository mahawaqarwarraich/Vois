import React, {useEffect, useState, lazy, Suspense} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {Route} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import HomePage from "./containers/Pages/HomePage";
// import ArticleTopicCard from "./components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";
// import ArticleListItem from "./components/ArticlesDirectory/ArticleListItem/ArticleListItem";
// import ArticleMainHeader from "./components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
// import SearchBar from "./components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
// import ArticleTopics from "./containers/ArticlesDirectory/ArticleTopics/ArticleTopics";
import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
// import TextEditor from "./containers/TextEditor";

import SignupPage from "./components/Pages/User/SingupPage/SIgnupPage";
import LoginPage from "./components/Pages/User/LoginPage/LoginPage";
import ProfilePage from "./components/Pages/User/ProfilePage/ProfilePage";
import SearchInDirectory from "./containers/ArticlesDirectory/SearchInDirectory";

// import Articles from "./containers/ArticlesDirectory/Articles/Articles";
import BlogManager from "./containers/Blog/BlogManager";
// import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
import Articles from "./containers/ArticlesDirectory/Articles/Articles";
import ArticlesPage from "./containers/Pages/ArticlesPage/ArticlesPage";


import './App.css';
import Sidebar from "./containers/Sidebar";

const TextEditor = lazy(() => import("./containers/TextEditor"));

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

                <div style={{width: '15%', maxHeight: '100vh', height: '100vh'}}></div>
                <div style={{
                    width: '15%',
                    height: '100vh',
                    maxHeight: '100vh',
                    overflow: 'auto',
                    borderRight: '1.5px solid #d3d3d3',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '1000',
                    backgroundColor: '#fff',
                }}><Sidebar setsetStateFunc={setSidebarStateFunc}/></div>
                <div style={{width: '85%'}}>{setSidebarState ?
                    (<React.Fragment>
                            <Route path="/text-editor" render={props => (
                                <Suspense fallback={<LinearProgress />}>
                                    <TextEditor
                                        setCommands={newState => setSidebarState(newState)}
                                        {...props} />
                                </Suspense>)
                            }/>
                            <Route path="/blog" exact render={props => <BlogManager
                                setCommands={newState => setSidebarState(newState)}
                                {...props} />}/>
                            <Route path="/articles-directory/" exact render={props => <ArticleTopicsPage
                                setCommands={newState => setSidebarState(newState)}
                                {...props} />}/>
                            <Route path="/articles-directory/:topicName" exact
                                   render={props => <ArticlesPage
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props}/>}/>
                            <Route path="/articles-directory/:directoryName/search"
                                   render={props => <SearchInDirectory
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props}/>}/>
                            <Route path="/articles-directory/user-articles/:userId" exact
                                   render={props => <ArticlesPage
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props}/>}/>
                            <Route
                                path="/signup"
                                exact
                                render={(props) => <SignupPage {...props} />}
                            />
                            <Route path="/login" exact render={(props) => <LoginPage {...props} />}/>
                            <Route
                                path="/profile/:userId"
                                exact
                                render={(props) => <ProfilePage {...props} />}
                            />
                            <Route path="/" exact
                                   render={props => <HomePage
                                       setCommands={newState => setSidebarState(newState)}
                                       {...props} />}/>
                            <Route path="/article/:id" exact render={props => <BlogManager json={true}
                                                                                           setCommands={newState => setSidebarState(newState)} {...props} />}/>
                            <Route path="/article-new/:id" exact render={props => <BlogManager json={true}
                                                                                               setCommands={newState => setSidebarState(newState)} {...props} />}/>
                        </React.Fragment>
                    )
                    : ''}


                </div>
            </div>
        </>
    );
}

export default App;
