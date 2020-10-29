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
            callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"})
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset-500,behavior:"smooth"})
        }
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
