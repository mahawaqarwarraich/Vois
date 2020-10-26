import React, {useEffect} from "react";
import {Editor} from "react-draft-wysiwyg";

function DraftEditor(props) {

    useEffect(() => {

        props.setEditorContentProgramatically(props.transcript);
        props.resetTranscript()


    }, [props.transcript])

    return (
        <>
            <Editor
                editorState={props.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={props.onEditorStateChange}
                customStyleFn={props.customStyleFn}
            />
            <h1>{props.irs}</h1>
            <button onClick={() => props.setEditorContentProgramatically("This editor is super cool !\n")}>click me
            </button>
        </>
    );

}

export default DraftEditor;