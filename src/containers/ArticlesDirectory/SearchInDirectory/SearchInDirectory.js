import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';


import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import {useSpeechRecognition} from "react-speech-recognition";

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

    const clearSearchField = () => {
        setQuery('');
    }
    const handleQueryChange = e => {
        setQuery(e.target.value);
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
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'go to homepage',
            callback: () => props.history.push('/'),
            description: 'Goes to the home page',
        },
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




    return (
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
    )

};

export default SearchInDirectory;