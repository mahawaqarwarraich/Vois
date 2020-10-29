import React from "react";

import BlogHeader from "./BlogHeader";
import BlogBody from "./BlogBody";
import {useSpeechRecognition} from "react-speech-recognition";

function BlogUI(props) {
    const commands = [
        {
            command: 'go back',
            callback: () => props.history.goBack(),
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo(window.pageYOffset, window.pageYOffset+500)
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo(window.pageYOffset, window.pageYOffset-500)
        },
    ];

    const { Transcript } = useSpeechRecognition({commands});
  return (
    <React.Fragment>
      <BlogHeader config={{...props.config.header}} />
      <BlogBody config={{...props.config.body}} />
    </React.Fragment>
  );
}

export default BlogUI;
