import React, {useEffect, useState} from "react";

import Selector from "../../Selector";
import {useSpeechRecognition} from "react-speech-recognition";

function AddComment(props) {

    const [text, setText] = useState('');
    const commands = [
        {
            command: 'submit comment',
            callback: () => {
                props.addComment();
                props.hide();
            }
        },
        {
            command: 'close',
            callback: () => props.hide(),
            description: 'Closes this modal.'
        },
    ];

    const {transcript} = useSpeechRecognition({commands});

    useEffect(() => {
        setText(transcript);
    }, [transcript])

    return (
        <React.Fragment>

            {props.show ? <Selector commands={[...commands]} {...props}>
                <p>{text}</p>
            </Selector> : ''}

        </React.Fragment>
    );

}

export default AddComment;