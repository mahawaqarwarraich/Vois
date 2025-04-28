import React, {useEffect, useState, useRef} from "react";
import {convertFromRaw, EditorState, Modifier, RichUtils} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import createStyles from "draft-js-custom-styles";
import {useSpeechRecognition} from "react-speech-recognition";
import {convertToRaw} from 'draft-js';
import axios from 'axios';
import {stateToHTML} from 'draft-js-export-html';
import FormData from "form-data";
import {useSnackbar} from 'notistack';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';
import saveAs from 'save-as'
import { useCallback } from 'react';


import DraftEditor from "./DraftEditor";
import BlogHeader from "../../components/Blog/BlogUI/BlogHeader";
import ArticleTopicSelector from "../Blog/ArticleTopicSelector";
import ArticleCoverImageSelector from "../Blog/ArticleCoverImageSelector";

import authHeader from "../../services/auth-header";
import authService from "../../services/auth-service";
import {withStyles} from "@material-ui/core/styles";

const TitleField = withStyles({
    root: {
        '& label': {
            color: '#4285f4',
            fontWeight: 'bold',
        },
        '& label.Mui-focused': {
            color: '#4285f4',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#4285f4',
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: '#4285f4',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4285f4',
            },
        },
    },
})(TextField);

const BlueTextTypography = withStyles({
    root: {
        color: "#4285f4"
    }
})(Typography);

function TextEditor(props) {
    //State Initialization for this component
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); //state for setting the content of Draft Editor
    const [showTopics, setShowTopics] = useState(false); //If true then shows the list of topics for the new article
    const [topic, setTopic] = useState(''); //Topic for the current article
    const [loading, setLoading] = useState(false); //Loading state to show loader while an http request is progressing
    const [blogId, setBlogId] = useState(props.editor ? props.match.params.id : ''); //Feteches a blog if in edit mode
    const [secureURL, setSecureURL] = useState(''); //Holds blog cover image url - secureId
    const [publicURL, setPublicURL] = useState(''); //Holds blog cover image public url
    const [blogHeaderConfig, setBlogHeaderConfig] = useState({
        imageURL: '',
        author: '...',
        createdOn: `${(new Date()).toDateString()}`,
    }) //config for setting the Blog Header
    const [owner, setOwner] = useState(false); //Check if the user is owner of this blog in edit mode
    const customStylesToManage = ["font-size", "color", "font-family"];
    const {styles, customStyleFn, exporter} = createStyles(customStylesToManage, "CUSTOM_")

    const {enqueueSnackbar} = useSnackbar();

    //Updates the topic
    const handleTopicChange = topic => setTopic(topic);
    
    //Registered Voice Commands for this component
    const commands = [
        {
            command: 'Go back.',
            callback: () => props.history.goBack(),
            description: 'Go back to the previous page',
        },
        {
            command: 'Go to homepage.',
            callback: () => props.history.push('/'),
            description: 'Goes to the home page',
        },
        {
            command: 'Set title *.',
            callback: title => setTitle(title),
            description: 'Sets Title of the article'
        },
        {
            command: 'Set topic.',
            callback: () => setShowTopics(true),
            description: 'Opens the list of topics to select from',
        },
        {
            command: 'Bold.',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'BOLD')),
            description: 'Toggles Bold style to the text',
        },
        {
            command: 'Italics.',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'ITALIC')),
            description: 'Toggles Italics style to the text',
        },
        {
            command: 'Underline.',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')),
            description: 'Toggles Underline style to the text',
        },
        {
            command: 'Strikethrough.',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')),
            description: 'Toggles Strikethrough style to the text',
        },
        {
            command: 'Code.',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'CODE')),
            description: 'Toggles code style to the text',
        },
        {
            command: 'Heading level 1.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-one')),
            description: 'Toggles heading 1 block style',
        },
        {
            command: 'Heading level 2.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-two')),
            description: 'Toggles heading 2 block style',
        },
        {
            command: 'Heading level 3.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-three')),
            description: 'Toggles heading 3 block style',
        },
        {
            command: 'Heading level 4.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-four')),
            description: 'Toggles heading 4 block style',
        },
        {
            command: 'Heading level 5.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-five')),
            description: 'Toggles heading 5 block style',
        },
        {
            command: 'Heading level 6.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-six')),
            description: 'Toggles heading 6 block style',
        },
        {
            command: 'Code block.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'code-block')),
            description: 'Toggles code block style',
        },
        {
            command: 'Blockquote.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'blockquote')),
            description: 'Toggles blockquote block style',
        },
        {
            command: 'Ordered list.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'ordered-list-item')),
            description: 'Inserts an Ordered-List-Item',
        },
        {
            command: 'Unordered list.',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'unordered-list-item')),
            description: 'Inserts an Unordered-List-Item',
        },
        {
            command: 'New line.',
            callback: () => setEditorState(editorState => RichUtils.insertSoftNewline(editorState)),
            description: 'Inserts a New Line',
        },
        {
            command: 'Set font.',
            callback: () => setEditorState(editorState => styles.fontSize.toggle(editorState, "24px")),
            description: 'Sets Font-Size to 24px'
        },
        {
            command: 'Set font family.',
            callback: () => setEditorState(editorState => styles.fontFamily.toggle(editorState, "Times New Roman")),
            description: 'Sets Font-Family to Times New Roman'
        },
        {
            command: 'Convert state.',
            callback: () => {
                let contentState = editorState.getCurrentContent();
                console.log("ContentState => ", contentState);
                let html = stateToHTML(contentState);
                console.log(html);
            },
            description: 'Converts content state to HTML'
        },
        {
            command: 'Set cover image.',
            callback: () => setShowImageSelector(true),
            description: 'Opens options for selecting cover image',
        },
        {
            command: 'Download state.',
            callback: () => {
                let contentState = editorState.getCurrentContent();
                let htmlString = stateToHTML(contentState);
            },
            description: 'Downloads the document in DOCX format'
        },
        {
            command: 'Publish article.',
            callback: () => publishArticle(),
            description: 'Publishes the article and navigates to the published article page',
        }
    ];

    // Fixed updateSidebar function with proper useCallback and dependencies
    const updateSidebar = useCallback(() => {
        props.setCommands(commands);
    }, [props, commands]);

    // Hides the topics list and doesn't call updateSidebar here
    const hideTopics = () => {
        setShowTopics(false);
    };

    // Routes to the Version Control System to show the edit history of an article
    const handleViewVersionHistory = () => {
        props.history.push("/vcs/" + blogId);
    };

    const commandsAndDesc = [];

    commands.forEach(cmd => {
        commandsAndDesc.push({command: cmd.command, description: cmd.description})
    });

    // Call updateSidebar only when dependencies change
    useEffect(() => {
        updateSidebar();
    }, [updateSidebar]);

    const [versions, setVersions] = useState([]);

    //Update blog config with the fetched blog data if in edit mode
    const updateBlogConfig = useCallback((userId) => {
        if (props.match && props.match.params.vid) {
            axios.get("http://localhost:8000/get-articles-version-history/" + props.match.params.id, {
                headers: authHeader(),
            })
                .then(res => {
                    console.log(res);
                    setLoading(false);
                    const versionHistory = res.data["version_history"]["Version_History"];
                    setVersions([...versionHistory]);
                    let article = versionHistory[parseInt(props.match.params.vid)].article;

                    let owner = false;
                    if (userId) {
                        if (userId === article.Author.id) {
                            owner = true;
                            setOwner(true);
                        } else {
                            //change later
                            owner = true;
                            setOwner(true);
                        }
                    }
                    let d = new Date(article.PostedOn);
                    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;


                    setBlogHeaderConfig({
                        imageURL: article.PictureSecureId,
                        createdOn: date,
                        author: article.Author.authorName,
                    });
                    setTitle(article.Title);
                    setTopic(article.Topic);

                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(article.Body))));
                })
                .catch(err => {
                    console.log(err);
                    // props.history.push("/");
                })
        } else if (props.match) {
            axios
                .get("http://localhost:8000/get-article/" + blogId)
                .then((res) => {
                    console.log(res.data.article, "article");
                    setLoading(false);
                    let owner = false;
                    if (userId) {
                        if (userId === res.data.article.Author.id) {
                            owner = true;
                            setOwner(true);
                        } else {
                            props.history.push("/");
                        }
                    }
                    let d = new Date(res.data.article.PostedOn);
                    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;


                    setBlogHeaderConfig({
                        imageURL: res.data.article.PictureSecureId,
                        createdOn: date,
                        author: res.data.article.Author.authorName,
                    });
                    setTitle(res.data.article.Title);
                    setTopic(res.data.article.Topic);

                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.article.Body))));

                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [props.match, blogId, props.history]);


    useEffect(() => {
        //If in edit mode load the blog data
        if (props.editor) {
            setLoading(true);
            let _user = authService.getCurrentUser();
            if (_user && _user.userId) {
                updateBlogConfig(_user.userId);
            } else {
                props.history.push("/");
            }
        } else { //If in create mode, initialize the state accordingly
            let _user = authService.getCurrentUser();
            if (_user && _user.userId) {
                const d = new Date();
                const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                setBlogHeaderConfig({
                    imageURL: '',
                    createdOn: `${date}`,
                    author: _user.username,
                });
            } else {
                props.history.push('/login');
            }
        }
    }, [props.editor, props.history, updateBlogConfig]);


    const {resetTranscript, interimTranscript, finalTranscript} = useSpeechRecognition({commands});
    const [editorJSON, setEditorJSON] = useState('');

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
    };

    //Insert the transcribed text into the text editor
    const insertText = (text, editorState) => {
        const currContent = editorState.getCurrentContent();
        const currSelection = editorState.getSelection();
        const newContent = Modifier.replaceText(currContent, currSelection, text, editorState.getCurrentInlineStyle());
        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    };

    //Sets the text editor state programatically
    const setEditorContentProgramatically = (text) => {
        let shouldProvoke = true;
        //Do not insert commands into the text editor as plain text
        commands.forEach(cmd => {
            if (text === cmd.command) {
                shouldProvoke = false;
            }
        });
        if (text.includes('set title'))
            shouldProvoke = false;
        if (showTopics)
            shouldProvoke = false;
        if (showCoverImageSelector)
            shouldProvoke = false;
        if (text.includes('set topic of'))
            shouldProvoke = false;
        if (shouldProvoke) {
            setEditorState(currEditorState => {
                return insertText(text.length > 0 ? text + ' ' : text, currEditorState);
            });
        }
    };


    const [title, setTitle] = useState('');
    const titleInputEl = useRef(null);

    //Published the article - If in edit mode then updates the article
    const publishArticle = () => {
        let url = "http://localhost:8000/add-article";
        if (props.editor) {
            url = "http://localhost:8000/edit-article";
        }

        if (title !== '' && editorState.getCurrentContent().hasText() && topic !== '' && blogHeaderConfig.imageURL !== '') {
            setLoading(true);
            let data = new FormData();
            if (isImageLocal) {
                data.append("picture", document.querySelector("#coverImage").files[0]);
            } else {
                if (props.editor)
                    data.append("secure_url", blogHeaderConfig.imageURL);
                else
                    data.append("link", blogHeaderConfig.imageURL);
            }

            if (props.editor) {
                data.append("articleId", blogId);
            }
            data.append("title", title);
            data.append("topic", topic);
            data.append("body", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            console.log(blogHeaderConfig.imageURL);
            console.log(isImageLocal);
            console.log(data.title, "reqData");


            axios.post(url, data, {
                headers: authHeader(),
            }).then(res => {
                console.log(res);
                setLoading(false);
                console.log(res.data.article._id);
                const _id = res.data.article._id;

                props.history.push("/article/" + _id);
                // alert("Blog published successfully!");
            }).catch(err => {
                console.log(err);
            });
        } else {
            let variant = "error";
            let missingFields = [];
            if (title === '') missingFields.push("Title");
            if (!editorState.getCurrentContent().hasText()) missingFields.push("Article Body");
            if (topic === '') missingFields.push("Topic");
            if (blogHeaderConfig.imageURL === '') missingFields.push("Cover Image");
            let PluralConfirmedString = missingFields.length > 1 ? "s: " : ": ";
            enqueueSnackbar(`Please fill in the following missing field${PluralConfirmedString}` + missingFields.join(', '), {variant});
        }
    };

    const [showCoverImageSelector, setShowImageSelector] = useState(false);
    const [isImageLocal, setIsImageLocal] = useState(false);
    
    const setCoverImage = (imageUrl, isImageLocal = false) => {
        setIsImageLocal(isImageLocal);
        setBlogHeaderConfig(prev => ({
            ...prev,
            imageURL: imageUrl
        }));
    };
    
    //Handle local file upload
    const handleCoverImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setCoverImage(URL.createObjectURL(event.target.files[0]), true);
            setShowImageSelector(false);
        }
    };

    return (
        <React.Fragment>
            <div id={"download-area"}></div>
            {loading ? <LinearProgress/> : ''}
            <div style={{margin: '20px 2.5% 20px 2.5%', position: 'relative'}}>
                {props.doc ?
                    <TitleField gutterBottom variant={"outlined"} value={title} onChange={e => setTitle(e.target.value)}
                                label={"Say set title <titlename> to set the title for this document"} fullWidth/> : ''}
                <br/>
                <div style={{marginBottom: '25px'}}></div>
                {props.doc ? '' : <BlogHeader config={{
                    ...blogHeaderConfig,
                    title: title.length > 0 ? title : 'Untitled - Say "set title <titlename>" to set a title',
                    setCommands: props.setCommands,
                    showCoverImageSelectorButton: true,
                    setShowCoverImageSelector: () => setShowImageSelector(true),
                }}/>}

                {props.doc ? '' : showCoverImageSelector ? <ArticleCoverImageSelector
                    setCoverImage={setCoverImage}
                    hide={() => {setShowImageSelector(false);}}
                    setCommands={props.setCommands}
                    handleCoverImageChange={handleCoverImageChange}/> : ''}

                <input
                    id={"coverImage"}
                    type={"file"}
                    accept={"image/*"}
                    onChange={handleCoverImageChange}
                    hidden
                />
                {props.doc ? '' : <ArticleTopicSelector topic={topic} setCommands={props.setCommands} show={showTopics}
                                                        setTopic={handleTopicChange}
                                                        hide={hideTopics}/>}

                {props.doc ? (
                    <div style={{display: 'flex', alignItems: 'center', direction: 'rtl', marginBottom: '10px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <BlueTextTypography variant={"button"}>Generate word document</BlueTextTypography>
                            <MicIcon style={{fill: '#4285f4'}}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', margin: '0 12.5px'}}>
                            <BlueTextTypography variant={"button"}>Generate PDF</BlueTextTypography>
                            <MicIcon style={{fill: '#4285f4'}}/>
                        </div>
                    </div>
                ) : props.editor ?
                    <div style={{display: 'flex', alignItems: 'center', direction: 'rtl', marginBottom: '10px'}}>
                        <BlueTextTypography variant={"button"}>View Version History</BlueTextTypography>
                        <MicIcon style={{fill: '#4285f4'}}/>
                    </div> : ''}

                <DraftEditor interimTranscript={interimTranscript} transcript={finalTranscript}
                             resetTranscript={resetTranscript} onEditorStateChange={onEditorStateChange}
                             setEditorContentProgramatically={setEditorContentProgramatically} editorState={editorState}
                             customStyleFn={customStyleFn}/>
                {interimTranscript}
            </div>
        </React.Fragment>
    );
}

export default TextEditor;