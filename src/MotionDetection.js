// src/MotionDetection.js
import React, { useEffect, useRef } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';

const MotionDetection = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const netRef = useRef(null);

    useEffect(() => {
        const loadModel = async () => {
            netRef.current = await bodyPix.load();
            console.log("Model loaded.");
        };

        loadModel();
    }, []);

    const detect = async () => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const segmentation = await netRef.current.segmentPerson(video);

            const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
            bodyPix.drawMask(
                canvasRef.current,
                video,
                coloredPartImage,
                0.7,
                0,
                false
            );
        }
    };

    useEffect(() => {
        const interval = setInterval(detect, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Webcam
                ref={webcamRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9,
                    width: 640,
                    height: 480,
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9,
                    width: 640,
                    height: 480,
                }}
            />
        </div>
    );
};

export default MotionDetection;