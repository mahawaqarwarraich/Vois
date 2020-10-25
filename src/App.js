import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

// import HomePage from "./containers/Pages/HomePage";
// import ArticleTopicCard from "./components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";
// import ArticleListItem from "./components/ArticlesDirectory/ArticleListItem/ArticleListItem";
// import ArticleMainHeader from "./components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
// import SearchBar from "./components/ArticlesDirectory/UIElements/SearchBar/SearchBar";
// import ArticleTopics from "./containers/ArticlesDirectory/ArticleTopics/ArticleTopics";
 import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
// import ArticleTopicsPage from "./containers/Pages/ArticleTopicsPage/ArticleTopicsPage";
import TextEditor from "./containers/TextEditor";
// import Articles from "./containers/ArticlesDirectory/Articles/Articles";
// import ArticlesPage from "./containers/Pages/ArticlesPage/ArticlesPage";

import './App.css';

function App() {

    const [boldState, setBoldState] = useState(false);


    useEffect(() => {
        SpeechRecognition.startListening({continuous: true});
    }, [])


    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
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
            <TextEditor/>g
        </div>
    );
}

export default App;
