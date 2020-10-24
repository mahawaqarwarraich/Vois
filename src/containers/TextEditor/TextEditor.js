import React, {useEffect, useState} from "react";
import {EditorState, Modifier, RichUtils} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useSpeechRecognition} from "react-speech-recognition";

import DraftEditor from "./DraftEditor";

function TextEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const commands = [
        {
            command: 'bold',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'BOLD')),
        },
        {
            command: 'italics',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'ITALIC')),
        },
        {
            command: 'underline',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')),
        },
        {
            command: 'strikethrough',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')),
        },
        {
            command: 'code',
            callback: () => setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, 'CODE')),
        },
        {
            command: 'heading level 1',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-one'))
        },
        {
            command: 'heading level 2',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-two'))
        },
        {
            command: 'heading level 3',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-three'))
        },
        {
            command: 'heading level 4',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-four'))
        },
        {
            command: 'heading level 5',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-five'))
        },
        {
            command: 'heading level 6',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'header-six'))
        },
        {
            command: 'code block',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'code-block'))
        },
        {
            command: 'blockquote',
            callback: () => setEditorState(editorState => RichUtils.toggleBlockType(editorState, 'blockquote'))
        },

    ];

    const {resetTranscript, interimTranscript, finalTranscript} = useSpeechRecognition({commands});


    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        console.log(editorState.getCurrentContent());
    }

    const insertText = (text, editorState) => {
        const currContent = editorState.getCurrentContent();
        const currSelection = editorState.getSelection();

        const newContent = Modifier.replaceText(currContent, currSelection, text, editorState.getCurrentInlineStyle());

        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');

        return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    }

    const setEditorContentProgramatically = (text) => {
        if (text !== 'bold')
            setEditorState(currEditorState => {
                return insertText(text, currEditorState);
            })

        // this.focusEditor();
    };


    return (
        <React.Fragment>
            <DraftEditor interimTranscript={interimTranscript} transcript={finalTranscript}
                         resetTranscript={resetTranscript} onEditorStateChange={onEditorStateChange}
                         setEditorContentProgramatically={setEditorContentProgramatically} editorState={editorState}/>
            {interimTranscript}
            <h1>{finalTranscript}</h1>
            <p>Available Commands:</p>
            <ul>
                {commands.map(cmd => {
                    return <li key={cmd.command}>{cmd.command}</li>
                })}
            </ul>
        </React.Fragment>);

}

export default TextEditor;