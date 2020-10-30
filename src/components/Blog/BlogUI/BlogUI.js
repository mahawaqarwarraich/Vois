import React, {useEffect, useState} from "react";

import BlogHeader from "./BlogHeader";
import BlogBody from "./BlogBody";
import {useSpeechRecognition} from "react-speech-recognition";
import AddComment from "../../../containers/Blog/AddComment";

function BlogUI(props) {
    const commands = [
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Goes back to the previous page',
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo({top: window.pageYOffset + 500, behavior: "smooth"})
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset - 500, behavior: "smooth"})
        },
        {
            command: 'add comment',
            callback: () => setShowAddComment(true),
            description: 'Opens up an input field for adding a comment.'
        },
    ];
    useEffect(() => {
        props.setCommands(commands);
    }, [])

    const [showAddComment, setShowAddComment] = useState(false);
    const hideAddComment = () => {
        setShowAddComment(false);
    }

    const {Transcript} = useSpeechRecognition({commands});
    return (
        <React.Fragment>
            <BlogHeader config={{...props.config.header}}/>
            <BlogBody viewBlog={props.viewBlog} json={props.json} config={{...props.config.body}}/>
            <AddComment setCommands={props.setCommands} show={showAddComment} hide={hideAddComment}/>
        </React.Fragment>
    );
}

export default BlogUI;
