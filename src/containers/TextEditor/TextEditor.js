import React, {useEffect, useState, useRef} from "react";
import {EditorState, Modifier, RichUtils} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import createStyles from "draft-js-custom-styles";
import {useSpeechRecognition} from "react-speech-recognition";
import {convertToRaw} from 'draft-js';
import axios from 'axios';
import {stateToHTML} from 'draft-js-export-html';


import DraftEditor from "./DraftEditor";
import BlogHeader from "../../components/Blog/BlogUI/BlogHeader";
import ArticleTopicSelector from "../Blog/ArticleTopicSelector";

import authHeader from "../../services/auth-header";

function TextEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showTopics, setShowTopics] = useState(false);
    const [topic, setTopic] = useState('');

    const customStylesToManage = ["font-size", "color", "font-family"];
    const {styles, customStyleFn, exporter} = createStyles(customStylesToManage, "CUSTOM_")

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
        // const url = "https://www.googleapis.com/customsearch/v1/key=AIzaSyAmFfu2RsIuY7DoarLaK-GNoMQAkXoq4sQ&cx=b99ad2dddfcac4813&searchType=image&q=tom%and%jerry";
        // axios.get(proxyurl + url)
        //     .then(res => {
        //         console.log(res);
        //     }).catch(err => {
        //         console.log(err);
        // });
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
        if (shouldProvoke) {
            setEditorState(currEditorState => {
                return insertText(text.length > 0 ? text + ' ' : text, currEditorState);
            })
        }
    };


    const [title, setTitle] = useState('');
    const titleInputEl = useRef(null);

    const publishArticle = () => {
        if (title !== '' && editorState.getCurrentContent().hasText() && topic !== '') {
            axios.post("http://localhost:8000/add-article", {
                title: title,
                body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                topic: topic,
            }, {
                headers: authHeader(),
            }).then(res => {
                console.log(res);
                console.log(res.data.article._id);
                const _id = res.data.article._id;
                props.history.push("/article-new/" + _id);
                // alert("Blog published successfully!");
            })
            console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())), "tada!");
        }
    }

    const [blogHeaderConfig, setBlogHeaderConfig] = useState({
        imageURL: '',
        author: 'Haysam Bin Tahir',
        createdOn: `${(new Date()).toDateString()}`,
    })


    return (
        <div style={{margin: '20px 2.5% 20px 2.5%', position: 'relative'}}>
            <BlogHeader config={{
                ...blogHeaderConfig,
                title: title.length > 0 ? title : 'Untitled - Say "set title <titlename>" to set a title'
            }}/>
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
    );

}

export default TextEditor;