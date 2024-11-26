import React, {useState} from "react";
import SigninForm from "../../../../containers/User/Auth/SigninForm/SigninForm";
import WebcamCapture from "../../../../components/WebcamCapture/WebcamCapture";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useSpeechRecognition} from "react-speech-recognition";


let modalStyle = {
  position:"relative"
}

let modalBodyStyle = {
  position:"fixed",
  top:"50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFFFFF",
  padding: "1rem 5rem 3rem 5rem"
}

const LoginPage = (props) => {
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyFacialAuth, setVerifyFacialAuth] = useState(false);


  const commands = [
    {
      command: 'use face authentication',
      callback: () => {trigerFacialAuth()},
      description: 'Opens webcam to use facial authentication'
    },
    {
      command: 'close face authentication',
      callback: () => {FaceAuthModalClosedHandler()},
      description: 'Closes Webcam modal'
    },
    {
      command: 'go back',
      callback: () => props.history.goBack(),
      description: "Goes back to the previous page",
    },
  ];


  const {Transcript} = useSpeechRecognition({commands});


  const trigerFacialAuth = () => {
    setWebcamModalOpen(true);
    setVerifyFacialAuth(true);
  }

  const verifyFacialAuthHandler = (blob) => {
    console.log("Entered verifyFacialAuthHandler")
    const fd = new FormData();

    fd.append("picture", blob);

    setWebcamModalOpen(false);
    setLoading(true);

    axios
    .post("http://localhost:8000/verify-facial-auth", fd, {
      'content-type': 'multipart/form-data'
    })
    .then((response) => {
      setLoading(false);
      console.log(response);

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        props.history.push("/");
      }
    });
  }

  const FaceAuthModalClosedHandler = () => {
    setWebcamModalOpen(false);
    setVerifyFacialAuth(false);
  }
  return (
    <React.Fragment>
      {loading ? <LinearProgress /> : ""}
      <SigninForm {...props} />
      jkdjfkd
      <Modal
              style={modalStyle}
              open={webcamModalOpen}
              onClose={FaceAuthModalClosedHandler}
              // aria-labelledby="simple-modal-title"
              // aria-describedby="simple-modal-description"
          >
            
            <div style={modalBodyStyle}>
              <h4 style={{marginBottom:"2rem",textAlign:"center"}}>Facial Authentication - <strong>Please Look Straight</strong></h4>
              <input
                  id="upload-image"
                  class="upload-image"
                  type="file"
                  // onChange={fileSelectedHandler}
              />
              <div>
                <WebcamCapture
                    FaceAuthModalClosedHandler = {FaceAuthModalClosedHandler}
                    verifyFacialAuth = {verifyFacialAuth}
                    verifyFacialAuthHandler = {verifyFacialAuthHandler}
                    />
              </div>
            </div>
          </Modal>
    </React.Fragment>
  );
};

export default LoginPage;
