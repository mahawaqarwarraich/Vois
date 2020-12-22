import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import LinearProgress from "@material-ui/core/LinearProgress";
import {useSnackbar} from "notistack";

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import {useSpeechRecognition} from "react-speech-recognition";
import ArticleListItem from "../../../components/ArticlesDirectory/ArticleListItem/ArticleListItem";
import {convertFromRaw, EditorState} from "draft-js";

const SearchField = withStyles({
    root: {
        '& label': {
            color: '#FFD459',
            fontWeight: 'bold',
        },
        '& label.Mui-focused': {
            color: '#FFD459',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FFD459',
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: '#FFD459',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FFD459',
            },
        },
    },
})(TextField);

function SearchInDirectory(props) {
    const [directoryName, setDirectoryName] = useState(props.match.params.directoryName);
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const clearSearchField = () => {
        setQuery('');
        setArticles([]);
    }
    const handleQueryChange = e => {
        setQuery(e.target.value);
    }
    const showBlogByVoiceHandler = articleTitle => {
        articleTitle = articleTitle.toLowerCase();

        articles.forEach(article => {
            if (article.Title.toLowerCase() == articleTitle) {
                const url = "/article/" + article._id;
                props.history.push(url);
            }
        })
    }
    const showBlogHandler = id => {
        const url = "/article/" + id;
        props.history.push(url);
    }

    const commands = [
        {
            command: 'search for *',
            callback: q => setQuery(q),
            description: `Searches for the keywords in the directory of ${directoryName} articles`,
        },
        {
            command: 'clear search',
            callback: clearSearchField,
            description: 'Resets the search field',
        },
        {
            command: 'open *',
            callback: (articleTitle) => showBlogByVoiceHandler(articleTitle),
            description: 'Open <article name> opens that article',
        },
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'go to homepage',
            callback: () => props.history.push('/'),
            description: 'Goes to the home page',
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo({top: window.pageYOffset + 500, behavior: "smooth"})
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset - 500, behavior: "smooth"})
        }
    ]
    const {transcript} = useSpeechRecognition({commands});
    const commandsAndDesc = [];

    commands.forEach(cmd => {
        commandsAndDesc.push({command: cmd.command, description: cmd.description})
    })

    const updateSidebar = () => {
        props.setCommands(commandsAndDesc);
    }

    useEffect(() => {
        updateSidebar()

    }, [])

    useEffect(() => {
        let url = directoryName === 'All Articles'
            ? "http://localhost:8000/search-all-articles"
            : "http://localhost:8000/search-articles-by-topic";
        if (query !== '') {
            setLoading(true);
            axios.post(url, {
                keyword: query,
                topic: directoryName,
            }).then(res => {
                console.log(res);
                setLoading(false);
                const articles = res.data.articles;
                const tempArticles = [];

                for (const article in articles) {
                    tempArticles.push(articles[article]);
                }
                if (tempArticles.length === 0) {
                    let variant = "info";
                    enqueueSnackbar("We could not find any article related to your search keywords", {variant});
                }
                setArticles(tempArticles);
            }).catch(err => {
                setLoading(false);
                let variant = "error";
                enqueueSnackbar("Something went wrong. Please make sure you are connected to the internet", {variant});
                console.log(err)
            })
        }
    }, [query]);


    return (
        <React.Fragment>
            {loading ? <LinearProgress /> : ''}
            <div style={{
                padding: '20px 60px',
            }}>
                <SearchField
                    value={query}
                    onChange={handleQueryChange}
                    variant="outlined"
                    label={`Start speaking to search in ${directoryName}`}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">
                            <IconButton onClick={clearSearchField}>
                                <ClearIcon/>
                                <Typography variant={"button"}>Clear search</Typography>
                            </IconButton>
                        </InputAdornment>,
                    }}
                    fullWidth/>
            </div>
            {articles.length > 0 ? articles.map(article => (
                <ArticleListItem
                    key={article._id}
                    title={article.Title}
                    body={EditorState.createWithContent(convertFromRaw(JSON.parse(article.Body)))}
                    cover={article.PictureSecureId}
                    date={article.PostedOn}
                    showBlogHandler={() => showBlogHandler(article._id)}
                />
            )) : <div style={{padding: '0 60px', textAlign: 'center'}}>
                <Typography variant="subtitle1">No results to show</Typography>
            </div>}
        </React.Fragment>
    )

};

export default SearchInDirectory;