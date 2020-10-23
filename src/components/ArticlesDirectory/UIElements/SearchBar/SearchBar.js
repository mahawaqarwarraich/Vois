import React from 'react';
import './SearchBar.scss';


const SearchBar = (props) => (
    <div className="ArticleDirectorySearchBar">
        <div className="ArticleDirectorySearchBar__Label">
            <label for="ArticleDirectorySearchBar__Input" className="ArticleDirectorySearchBar__Label--Text">Search</label>
        </div>
        <input id="ArticleDirectorySearchBar__Input" className="ArticleDirectorySearchBar__Input" placeholder="Ex. Information Technlogy"/>
    </div>
);

export default SearchBar;