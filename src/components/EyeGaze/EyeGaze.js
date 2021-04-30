import React, {useRef, useEffect} from 'react'
import App from "../../App";

const EyeGaze = (props) => {

    function PlotGaze(GazeData) {

        // let GazeData = this.GazeData;

        /*
        GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
        GazeData.docX // gaze x in document coordinates
        GazeData.docY // gaze y in document cordinates
        GazeData.time // timestamp
        */
        console.log(GazeData.X);

        // document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
        // document.getElementById("HeadPhoseData").innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
        // document.getElementById("HeadRotData").innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;

        //uncomment this
        // document.getElementById('GazeData').innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
        // document.getElementById('HeadPhoseData').innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
        // document.getElementById('HeadRotData').innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;


        var x = GazeData.docX;
        var y = GazeData.docY;

        var gaze = document.getElementById("gaze");
        x -= gaze.clientWidth / 2;
        y -= gaze.clientHeight / 2;


        gaze.style.left = x + "px";
        gaze.style.top = y + "px";


        if (GazeData.state !== 0) {
            if (gaze.style.display === 'block')
                gaze.style.display = 'none';
        } else {
            if (gaze.style.display === 'none')
                gaze.style.display = 'block';
        }

    }


    useEffect(() => {
        window.addEventListener("load", function () {

            // const calibration = () => {
            //     return new Promise (resolve => {

            //     })
            // }
            window.GazeCloudAPI.OnCalibrationComplete = function () {
                console.log("Calibration Complete");
            }
            window.GazeCloudAPI.OnCamDenied = function () {
                console.log('camera  access denied')
            }
            window.GazeCloudAPI.OnError = function (msg) {
                console.log('err: ' + msg)
            }
            window.GazeCloudAPI.UseClickRecalibration = true;
            window.GazeCloudAPI.OnResult = PlotGaze;
            // console.log(result.GazeX);
        });
    }, []);

    return (
        <div>


            <button type="button" onClick={window.GazeCloudAPI.StartEyeTracking()}>Start</button>
            <button type="button" onClick={window.GazeCloudAPI.StopEyeTracking()}>Stop</button>
            {/*<div>*/}
            {/*    <p>*/}
            {/*        Real-Time Result:</p>*/}
            {/*    <p id="GazeData"></p>*/}
            {/*    <p id="HeadPhoseData"></p>*/}
            {/*    <p id="HeadRotData"></p>*/}

            {/*</div>*/}
            <div id="gaze" style={{
                position: "absolute",
                display: "none",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "solid 2px  rgba(255, 255,255, .2)",
                boxShadow: "0 0 100px 3px rgba(125, 125,125, .5)",
                pointerEvents: "none",
                zIndex: "999999"
            }}/>


            <App {...props} />

        </div>
    )
}

export default EyeGaze
