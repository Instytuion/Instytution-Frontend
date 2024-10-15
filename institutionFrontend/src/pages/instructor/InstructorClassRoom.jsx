import { useTheme } from '@emotion/react';
import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useToast from '../../hooks/useToast';


const TURN_USERNAME = import.meta.env.VITE_TURN_USERNAME;
const TURN_SECRET = import.meta.env.VITE_TURN_SECRET;

    // const iceConfiguration = {
    //     iceServers: [
    //         { urls: 'stun:stun.l.google.com:19302' },
    //         { urls: 'stun:stun1.l.google.com:19302' }
    //     ]
    // };

    const iceConfiguration = {
        iceServers: [
            {
                urls: 'stun:global.xirsys.net'
            },
            {
                urls: 'stun:stun.l.google.com:19302'
            },
            {
                urls: 'stun:stun1.l.google.com:19302'
            },
            {
                urls: 'turn:global.xirsys.net:3478?transport=udp',
                username: TURN_USERNAME,
                credential: TURN_SECRET 
            },
            {
                urls: 'turn:global.xirsys.net:3478?transport=tcp',
                username: TURN_USERNAME,
                credential: TURN_SECRET 
            }
        ]
    };

const InstructorClassRoom = () => {
    const theme = useTheme();
    const {batchName} = useParams();
    let user = useSelector((state)=> state.userAuth.email);
    const accessToken = useSelector((state)=> state.userAuth.accessToken);
    const [btnOpenClass, setBtnOpenClass] = useState("Open Class Room")
    const [isConnecting, setIsConnecting] = useState(false);
    const [videoOff, setVideoOff] = useState({[user]: false});
    const [audioMute, setAudioMute] = useState({[user]: false});
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const videoStreams = useRef({ [user]: React.createRef() });
    const [videoList, setVideoList] = useState([user]);
    const mapPeers = useRef({});
    const webSocket = useRef(null)
    const showToast = useToast();

    //let localStream = new MediaStream();
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
                    if (videoStreams.current[user] && videoStreams.current[user].current) {
                        localStream.current = stream
                        videoStreams.current[user].current.srcObject = localStream.current;
                        videoStreams.current[user].current.muted = true;
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
            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
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

                //video stream remove 
                Object.keys(videoStreams.current).forEach((peerUserName) => {
                    if (peerUserName !== user) {
                        const videoElement = videoStreams.current[peerUserName].current;
                        
                        if (videoElement && videoElement.srcObject) {
                            const stream = videoElement.srcObject;
                            stream.getTracks().forEach(track => track.stop());
                        }
                        delete videoStreams.current[peerUserName];
                    }
                });
                setVideoList(prev=> [user])
                mapPeers.current = {}
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
        const action = data["action"]
        const peerUserName = data["user"]
        const student_channel_name = data["student_channel_name"]
        
        if(message == "Class room opened."){
            showToast(message, "success", 3000)
            return;
        }
        if(message == "Batch not found. Disconnecting..."){
            showToast(message, "error", 3000)
            return;
        }
        if(message == "Class already opened. Disconnecting..."){
            showToast(message, "error", 3000)
            return;
        }
        if(action == "new-peer"){
            console.log("new peer action recieved...");
            console.log("peerUserName recieved is...", peerUserName);
            const allowStudent = window.confirm(`Allow ${peerUserName} to join the class.`);
            if(allowStudent){
                const data = {
                    "student_channel_name": student_channel_name,
                    "message": "student_allowed"
                }
                const dataStr = JSON.stringify(data)
                webSocket.current.send(dataStr)
                createOffer(peerUserName, student_channel_name);
                return;
            }
            else{
                const data = {
                    "student_channel_name": student_channel_name,
                    "message": "student_dissallowed"
                }
                const dataStr = JSON.stringify(data)
                webSocket.current.send(dataStr)
                return;
            }
        }
        if(action == 'new-answer'){
            console.log("new answer action received...");
            console.log("peerUserName recieved is...", peerUserName);
            let answer = data["sdp"];
            let peer = mapPeers.current[peerUserName][0];
            peer.setRemoteDescription(answer);
            return
        }
        if (action === 'ice-candidate') {
            let candidate = new RTCIceCandidate(data.candidate);
            console.log("New ICE candidate received from student - ",candidate);
            let peer = mapPeers.current[peerUserName][0];
            peer.addIceCandidate(candidate)
                .then(() => console.log("Added ICE candidate from student successfully."))
                .catch(error => console.error("Error adding received ICE candidate:", error));
        }
    };

    function createOffer(peerUserName, student_channel_name){
        console.log("createOffer called...");
        let peer = new RTCPeerConnection(iceConfiguration);

        localStream.current.getTracks().forEach(track =>{
            peer.addTrack(track, localStream.current);
        })
        console.log("local stream added to peer...");

        remoteStream.current = new MediaStream();
        videoStreams.current[peerUserName] = React.createRef();
        peer.ontrack = (event) => {
            console.log('Received remote stream from peer:', peerUserName);
            event.streams[0].getTracks().forEach(track => {
                remoteStream.current.addTrack(track);
            });
    
            if (videoStreams.current[peerUserName] && videoStreams.current[peerUserName].current) {
                videoStreams.current[peerUserName].current.srcObject = remoteStream.current;
            }
            setAudioMute(prev => ({...prev, [peerUserName]: false}));
            setVideoOff(prev => ({...prev, [peerUserName]: false}));
        };
        setVideoList((prev)=> [...prev, peerUserName]);

        peer.oniceconnectionstatechange = () => {
            console.log('ICE connection state changed:', peer.iceConnectionState);
            let iceCS = peer.iceConnectionState;
            if (iceCS === "failed" || iceCS === "disconnected" || iceCS === "closed") {
                console.error('ICE connection failed/closed/disconnected for student:', peerUserName);
                setVideoList(prevList => prevList.filter(user => user !== peerUserName));
                delete mapPeers.current[peerUserName];
                delete videoStreams.current[peerUserName];
                if(iceCS !== "closed"){
                    console.log("peer closed for student: ", peerUserName)
                    peer.close();
                } 
            } else if (peer.iceConnectionState === 'connected') {
                console.log('ICE connection established for peer:', peerUserName);
            }
        };
        peer.onicecandidate = (event) => {
            if(event.candidate){
                console.log("New ICE candidate:");
                const data = {
                    "action": "ice-candidate",
                    "user": user,
                    "receiver_channel_name": student_channel_name,
                    "candidate": event.candidate
                };
                const dataStr = JSON.stringify(data);
                webSocket.current.send(dataStr);
                console.log("Ice candidate send to student...");
            }
        };

        peer.createOffer()
            .then(o=> {
                console.log("Offer created from instructor...");
                return peer.setLocalDescription(o)
            })
            .then(()=>{
                mapPeers.current[peerUserName] = [peer]
                console.log("local description set successfully");
                const data = {
                    "action": "new-offer",
                    "user": user,
                    "student_channel_name": student_channel_name,
                    "sdp": peer.localDescription
                }
                const dataStr = JSON.stringify(data)
                webSocket.current.send(dataStr)
                console.log("offer send to student...");
            })
            .catch(error => console.log("some error occured while create offer sdp...", error));
    };

    const handleMuteAudio = (peerUserName)=>{
        setAudioMute(prev=> ({...prev, [peerUserName]: !prev[peerUserName]}))
        let mediaStream = videoStreams.current[peerUserName].current.srcObject;
    
        if (mediaStream) {
            let audioTrack = mediaStream.getAudioTracks();
            if (audioTrack.length > 0) {
                audioTrack[0].enabled = !audioTrack[0].enabled; 
            }
        } else {
            console.log("No media stream found for the user:", peerUserName);
        }
    }

    const handleVideoOff = (peerUserName)=>{
        setVideoOff(prev => ({...prev, [peerUserName]: !prev[peerUserName]}))
        let mediaStream = videoStreams.current[peerUserName].current.srcObject;
    
        if (mediaStream) {
            let videoTrack = mediaStream.getVideoTracks();
            if (videoTrack.length > 0) {
                videoTrack[0].enabled = !videoTrack[0].enabled;
            }
        } else {
            console.log("No media stream found for the user:", peerUserName);
        }
    }

    
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
        <Grid container spacing={2} id="video-grid">
            {videoList.map((user)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} key={user}>
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
                        ref={videoStreams.current[user]}
                        width={"100%"}
                        autoPlay
                        style={{marginBottom:10}}
                        >
        
                        </video>
                        <Box
                        id="btn-mute-wrapper"
                        >
                            <IconButton 
                            onClick={()=> handleMuteAudio(user)}
                            sx={{ color: "white", py: 0 }}>
                                {audioMute[user] ? <MicOffIcon /> : <MicIcon />}
                            </IconButton>
                            <IconButton 
                            onClick={()=> handleVideoOff(user)}
                            sx={{ color: "white",  py: 0}}>
                                {videoOff[user] ? <VideocamOffIcon /> : <VideocamIcon />}
                            </IconButton>
                            <Typography component="span" color='white'>Name: {user}</Typography>
                        </Box>
                    </Box>                
                </Grid>
            ))}
        </Grid>
    </Container>
  )
}

export default InstructorClassRoom
