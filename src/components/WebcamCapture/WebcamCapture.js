import React from "react";
import Webcam from "react-webcam";
import './WebcamCapture.css';

const WebcamCapture = (props) => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then((res) => res.blob());
        // setImgSrc(imageSrc);

        console.log(blob);

        blob.lastModifiedDate = new Date();
        blob.name = "profilePicture";
        props.fileSelectedHandler(null,blob);

    }, [webcamRef, setImgSrc]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button style={{textAlign:"center"}} onClick={capture}>Capture photo</button>
            {imgSrc && (
                <img
                    src={imgSrc}
                />
            )}
        </>
    );
};

export default WebcamCapture;
