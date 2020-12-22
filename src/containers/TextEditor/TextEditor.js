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


import DraftEditor from "./DraftEditor";
import BlogHeader from "../../components/Blog/BlogUI/BlogHeader";
import ArticleTopicSelector from "../Blog/ArticleTopicSelector";
import ArticleCoverImageSelector from "../Blog/ArticleCoverImageSelector";

import authHeader from "../../services/auth-header";

function TextEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showTopics, setShowTopics] = useState(false);
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);

    const customStylesToManage = ["font-size", "color", "font-family"];
    const {styles, customStyleFn, exporter} = createStyles(customStylesToManage, "CUSTOM_")

    const {enqueueSnackbar} = useSnackbar();

    const handleTopicChange = topic => setTopic(topic);
    const hideTopics = () => {
        setShowTopics(false);
        updateSidebar();
    }


    const commands = [
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
            command: 'set title *',
            callback: title => setTitle(title),
            description: 'Sets Title of the article'
        },
        {
            command: 'set topic',
            callback: () => setShowTopics(true),
            description: 'Opens the list of topics to select from',
        },
        {
            command: 'publish article',
            callback: () => publishArticle(),
            description: 'Publishes the article and navigates to the published article page',
        },
        {
            command: 'bold',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'BOLD')),
            description: 'Toggles Bold style to the text',
        },
        {
            command: 'italics',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'ITALIC')),
            description: 'Toggles Italics style to the text',
        },
        {
            command: 'underline',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')),
            description: 'Toggles Underline style to the text',
        },
        {
            command: 'strikethrough',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')),
            description: 'Toggles Strikethrough style to the text',
        },
        {
            command: 'code',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'CODE')),
            description: 'Toggles code style to the text',
        },
        {
            command: 'heading level 1',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-one')),
            description: 'Toggles heading 1 block style',
        },
        {
            command: 'heading level 2',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-two')),
            description: 'Toggles heading 2 block style',
        },
        {
            command: 'heading level 3',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-three')),
            description: 'Toggles heading 3 block style',
        },
        {
            command: 'heading level 4',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-four')),
            description: 'Toggles heading 4 block style',
        },
        {
            command: 'heading level 5',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-five')),
            description: 'Toggles heading 5 block style',
        },
        {
            command: 'heading level 6',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-six')),
            description: 'Toggles heading 6 block style',
        },
        {
            command: 'code block',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'code-block')),
            description: 'Toggles code block style',
        },
        {
            command: 'blockquote',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'blockquote')),
            description: 'Toggles blockquote block style',
        },
        {
            command: 'ordered list',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'ordered-list-item')),
            description: 'inserts an Ordered-List-Item',
        },
        {
            command: 'unordered list',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'unordered-list-item')),
            description: 'inserts an Unordered-List-Item',
        },
        {
            command: 'new line',
            callback: () => setEditorState(editorState => RichUtils.insertSoftNewline(editorState)),
            description: 'Inserts a New Line',
            // callback: () => setEditorContentProgramatically('\u000A'),
        },
        {
            command: 'set font',
            callback: () => setEditorState(editorState => styles.fontSize.toggle(editorState, "24px")),
            description: 'Sets Font-Size to 24px'
        },
        {
            command: 'set font family',
            callback: () => setEditorState(editorState => styles.fontFamily.toggle(editorState, "Times New Roman")),
            description: 'Sets Font-Family to Times New Roman'
        },
        {
            command: 'convert state',
            callback: () => {
                let contentState = editorState.getCurrentContent();
                console.log("ContentState => ", contentState);
                let html = stateToHTML(contentState);
                console.log(html);
            },
            description: 'Converts content state to html'
        },
        {
            command: 'set cover image',
            callback: () => setShowImageSelector(true),
            description: 'Opens options for selecting cover image',
        },
        {
            command: 'download state',
            callback: () => {
                let contentState = editorState.getCurrentContent();
                let htmlString = stateToHTML(contentState);
                let headerHTMLString = '<p></p>';
                let footerHTMLString = '<p></p>';
            },
            description: 'Downloads the document in docx format'
        }

    ];

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

    const {resetTranscript, interimTranscript, finalTranscript} = useSpeechRecognition({commands});
    const [editorJSON, setEditorJSON] = useState('');

    const onEditorStateChange = editorState => {
        setEditorState(prevEditorState => {

            return editorState;
        });
        // setEditorJSON(JSON.stringify(convertToRaw(editorState.getCurrentContent())))

        // console.log(editorState.getCurrentContent());

    }


    // const onEditorChange = () => {
    //     setEditorJSON(JSON.stringify(convertToRaw(editorState.getContents())));
    // }

    useEffect(() => {
        console.log(editorJSON, "here");
    }, [editorJSON])

    const insertText = (text, editorState) => {
        const currContent = editorState.getCurrentContent();
        const currSelection = editorState.getSelection();
        const newContent = Modifier.replaceText(currContent, currSelection, text, editorState.getCurrentInlineStyle());
        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    }

    const setEditorContentProgramatically = (text) => {
        let shouldProvoke = true;
        commands.forEach(cmd => {
            if (text === cmd.command) {
                shouldProvoke = false;
            }
        })
        if (text.includes('set title'))
            shouldProvoke = false;
        if (showTopics)
            shouldProvoke = false;
        if (showCoverImageSelector)
            shouldProvoke = false;
        if (shouldProvoke) {
            setEditorState(currEditorState => {
                return insertText(text.length > 0 ? text + ' ' : text, currEditorState);
            })
        }
    };


    const [title, setTitle] = useState('');
    const titleInputEl = useRef(null);

    const publishArticle = () => {
        // let _state = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        // console.log(_state);
        // let _updated_state = EditorState.createWithContent(convertFromRaw(JSON.parse(_state)));
        // setEditorState(_updated_state);
        if (title !== '' && editorState.getCurrentContent().hasText() && topic !== '' && blogHeaderConfig.imageURL !== '') {
            setLoading(true);
            let data = new FormData();
            if (isImageLocal)
                data.append("picture", document.querySelector("#coverImage").files[0]);
            else
                data.append("link", blogHeaderConfig.imageURL);

            data.append("title", title);
            data.append("topic", topic);
            data.append("body", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            console.log(blogHeaderConfig.imageURL);
            console.log(isImageLocal);

            axios.post("http://localhost:8000/add-article", data, {
                headers: authHeader(),
            }).then(res => {
                console.log(res);
                setLoading(false);
                console.log(res.data.article._id);
                const _id = res.data.article._id;

                props.history.push("/article/" + _id);
                // alert("Blog published successfully!");
            })
            console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())), "tada!");
        } else {
            let variant = "error";
            let missingFields = [];
            if (title === '') missingFields.push("Title");
            if (!editorState.getCurrentContent().hasText()) missingFields.push("Article Body");
            if (topic == '') missingFields.push("Topic");
            if (blogHeaderConfig.imageURL == '') missingFields.push("Cover Image");
            let PluralConfirmedString = missingFields.length > 1 ? "s: " : ": ";
            enqueueSnackbar(`Please fill in the following missing field${PluralConfirmedString}` + missingFields.join(', '), {variant});
        }

        // let _json = {"blocks":[{"key":"42oqe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dsr29","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"6tcl2","text":"temperature nature set nature set image label to each set ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"EMBEDDED_LINK","mutability":"MUTABLE","data":{"src":"data:image/jpeg;base64,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","height":"auto","width":"auto"}}}}
        // setEditorState(EditorState.createWithContent(convertFromRaw(
        //     _json
        // )))
    }

    const [blogHeaderConfig, setBlogHeaderConfig] = useState({
        imageURL: '',
        author: 'Haysam Bin Tahir',
        createdOn: `${(new Date()).toDateString()}`,
    })
    const [showCoverImageSelector, setShowImageSelector] = useState(false);
    const [isImageLocal, setIsImageLocal] = useState(false);
    const setCoverImage = (imageUrl, isImageLocal = false) => {
        setIsImageLocal(isImageLocal);
        let blogHeaderConfigCopy = {...blogHeaderConfig};
        blogHeaderConfigCopy.imageURL = imageUrl;
        setBlogHeaderConfig({...blogHeaderConfigCopy});

    }

    const handleCoverImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setCoverImage(URL.createObjectURL(event.target.files[0]), true);
            setShowImageSelector(false);
            updateSidebar()
        }
    };

    return (
        <React.Fragment>
            {loading ? <LinearProgress/> : ''}
        <div style={{margin: '20px 2.5% 20px 2.5%', position: 'relative'}}>
            <BlogHeader config={{
                ...blogHeaderConfig,
                title: title.length > 0 ? title : 'Untitled - Say "set title <titlename>" to set a title',
                setCommands: props.setCommands,
                showCoverImageSelectorButton: true,
                setShowCoverImageSelector: () => setShowImageSelector(true),
            }}/>
            {showCoverImageSelector ? <ArticleCoverImageSelector
                setCoverImage={setCoverImage}
                hide={() => setShowImageSelector(false)}
                setCommands={props.setCommands}
                handleCoverImageChange={handleCoverImageChange}/> : ''}
            <input
                id={"coverImage"}
                type={"file"}
                accept={"image/*"}
                onChange={handleCoverImageChange}
                hidden
            />
            <ArticleTopicSelector topic={topic} setCommands={props.setCommands} show={showTopics}
                                  setTopic={handleTopicChange}
                                  hide={hideTopics}/>

            {/*<input style={{*/}
            {/*    width: '75%',*/}
            {/*    padding: '7px 18px',*/}
            {/*    border: '1px solid #d3d3d3',*/}
            {/*    borderRadius: '4px',*/}
            {/*    marginBottom: '25px',*/}
            {/*    fontSize: '18px',*/}
            {/*    position: 'absolute',*/}
            {/*    top: '10px',*/}
            {/*    left: '50%',*/}
            {/*    transform: 'translateX(-50%)',*/}
            {/*    backgroundColor: 'transparent',*/}
            {/*    borderColor: '#1a1616'*/}

            {/*}} ref={titleInputEl} name="article-title" type="text" value={title}*/}
            {/*       onChange={e => setTitle(e.target.value)} placeholder='Untitled - Say " Set Article Title*/}
            {/*<titlename>" to set the title for this article'/>*/}

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