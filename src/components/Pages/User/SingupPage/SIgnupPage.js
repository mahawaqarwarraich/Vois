import React, { useEffect } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import SignupForm from "../../../../containers/User/Auth/SignupForm/SignupForm";

const SignupPage = (props) => {
  // Define the handler functions
  const trigerFacialAuth = () => {
    // Implement facial authentication trigger logic here
    console.log("Facial authentication triggered");
  };

  const FaceAuthModalClosedHandler = () => {
    // Implement modal closing logic here
    console.log("Face auth modal closed");
  };

  const commands = [
    {
      command: 'use face authentication',
      callback: () => trigerFacialAuth(),
      description: 'Opens webcam to use facial authentication'
    },
    {
      command: 'close face authentication',
      callback: () => FaceAuthModalClosedHandler(),
      description: 'Closes Webcam modal'
    },
    {
      command: 'go back',
      callback: () => props.history.goBack(),
      description: "Goes back to the previous page",
    },
  ];

  useEffect(() => {
    if (props.setCommands) {
      props.setCommands(commands);
    }
  }, [commands, props]);

  const { transcript } = useSpeechRecognition({ commands });
  
  return (
    <React.Fragment>
      <SignupForm {...props} />
    </React.Fragment>
  );
};

export default SignupPage;