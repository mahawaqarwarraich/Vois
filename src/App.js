import React from 'react';

import HomePage from "./containers/Pages/HomePage";
import ArticleTopicCard from "./components/ArticlesDirectory/ArticleTopicCard/ArticleTopicCard";
import ArticleListItem from "./components/ArticlesDirectory/ArticleListItem/ArticleListItem";
import ArticleMainHeader from "./components/ArticlesDirectory/ArticleMainHeader/ArticleMainHeader";
import SearchBar from "./components/ArticlesDirectory/UIElements/SearchBar/SearchBar";

import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
      <ArticleTopicCard />
      <ArticleListItem />
      <ArticleMainHeader />
      <SearchBar />
    </div>
  );
}

export default App;
