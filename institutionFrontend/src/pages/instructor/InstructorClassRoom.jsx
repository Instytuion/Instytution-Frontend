import { useTheme } from '@emotion/react';
import { Box, Button, Container } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useToast from '../../hooks/useToast'

const InstructorClassRoom = () => {
    const theme = useTheme();
    const {batchName} = useParams();
    let user = useSelector((state)=> state.userAuth.email);
    const accessToken = useSelector((state)=> state.userAuth.accessToken);
    const [btnOpenClass, setBtnOpenClass] = useState("Open Class Room")
    const [isConnecting, setIsConnecting] = useState(false);
    const videoRefs = useRef({ [user]: React.createRef() });
    const webSocket = useRef(null)
    const showToast = useToast();

    let localStream = new MediaStream();
    let loc = window.location;
    let wssStart = "ws://";
    if(loc.protocol == "https:"){
        wssStart = "wss://";
    }
    let endPoint = wssStart + `localhost:8000/class-room/${batchName}/`;

    useEffect(()=>{
        const constrains = {
            "video": {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                facingMode: "user"
            },
            "audio": true,
        };

        let userMedia = navigator.mediaDevices.getUserMedia(constrains)
                .then(stream =>{
                    if (videoRefs.current[user] && videoRefs.current[user].current) {
                        localStream = stream
                        videoRefs.current[user].current.srcObject = localStream;
                        videoRefs.current[user].current.muted = true;
                }
                })
                .catch(error =>{
                    console.log("some error while accessing media devices - ", error);
                });

        // Cleanup WebSocket on component unmount
        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };

    }, [batchName]);

    const handleOpenClassRomm = ()=>{
        if (btnOpenClass == "Open Class Room"){
            setIsConnecting(true);
            setBtnOpenClass((prev)=>prev = (
            <>
            Connecting...<CircularProgress color='white' size="1rem" />
            </>
            ))
            webSocket.current = new WebSocket(endPoint, ['jwt', accessToken]);

            webSocket.current.onopen = () => {
                console.log('Connected to WebSocket');
                setBtnOpenClass((prev)=>prev = "Close Class Room")
                setIsConnecting(false);
            };

            webSocket.current.onmessage = (event) => webSocketOnMessage(event);

            webSocket.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                setBtnOpenClass((prev)=>prev = "Open Class Room")
                setIsConnecting(false);
                showToast("You are disconnected.", "error", 3000);
            };

            webSocket.current.onerror = (error) => {
                console.log('Error occurred from WebSocket', error);
                setIsConnecting(false);
                showToast("Some error occured.", "error", 3000)
            };
            
        }
        else{
            setBtnOpenClass((prev)=>prev = "Open Class Room");
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    };

    const webSocketOnMessage = (event)=>{
        console.log("webSocketOnMessage called...");
        const data = JSON.parse(event.data)
        console.log("onMessage data object is - ", data)
        const message = data["message"]
        const messageError = data["message_error"]
        const action = data["action"]
        const peerUserName = data["user"]
        const student_channel_name = data["student_channel_name"]
        
        if(message){
            showToast(message, "success", 3000)
        }
        if(messageError){
            showToast(messageError, "error", 3000)
        }

        if(action == "new-peer"){
            console.log("new peer action recieved...");
            
            createOffer(peerUserName, student_channel_name);
            return;
        }
    };

    function createOffer(peerUserName, student_channel_name){
        console.log("createOffer called...");
    };

    
  return (
    <Container sx={{py:3}}>
        <Button
        onClick={()=> handleOpenClassRomm()}
        variant='contained'
        sx={{
            bgcolor: theme.palette.customColors,
            mb:2,
        }}
        disabled={isConnecting} 
        >
            {btnOpenClass}
        </Button>
        <Box>
            <Box
            id="video-wrapper"
            sx={{ 
                border: '1px solid black', 
                p: 1 ,
                backgroundColor: "gray"
            }}
            >
                <video 
                id="local-video"
                ref={videoRefs.current[user]}
                width={"100%"}
                autoPlay
                style={{marginBottom:10}}
                >

                </video>
                <Box
                id="btn-mute-wrapper"
                >
                    <Button
                    variant='contained'
                    sx={{
                        bgcolor: theme.palette.customColors,
                    }}
                    >
                        Mute Audio
                    </Button>
                    <Button
                    variant='contained'
                    sx={{
                        bgcolor: theme.palette.customColors,
                        ml: 3
                    }}
                    >
                        Off Video
                    </Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default InstructorClassRoom
