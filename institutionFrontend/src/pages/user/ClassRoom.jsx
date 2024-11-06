import { useTheme } from '@emotion/react';
import { Box, Button, Container, IconButton, List, ListItem, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useToast from '../../hooks/useToast'
import {refreshToken} from '../../utils/axiosFunctions'

const TURN_USERNAME = import.meta.env.VITE_TURN_USERNAME;
const TURN_SECRET = import.meta.env.VITE_TURN_SECRET;

    // const iceConfiguration = {
    //     iceServers: [
    //         { urls: 'stun:stun.l.google.com:19302' },
    //         { urls: 'stun:stun1.l.google.com:19302' }
    //     ]
    // };
    // const iceConfiguration = {
    //     iceServers: [
    //         {
    //             urls: 'turn:global.xirsys.net:3478?transport=udp',
    //             username: TURN_USERNAME,
    //             credential: TURN_SECRET 
    //         },
    //         {
    //             urls: 'turn:global.xirsys.net:3478?transport=tcp',
    //             username: TURN_USERNAME,
    //             credential: TURN_SECRET 
    //         }
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

const ClassRoom = () => {
  const theme = useTheme();
    const {batchName} = useParams();
    let user = useSelector((state)=> state.userAuth.email);
    let firstName = useSelector((state)=> state.userAuth.firstName);
    let lastName = useSelector((state)=> state.userAuth.lastName);
    let accessToken = useSelector((state)=> state.userAuth.accessToken);
    const [btnJoinClass, setBtnJoinClass] = useState("Connect")
    const [isConnecting, setIsConnecting] = useState(false);
    const [videoOff, setVideoOff] = useState(false);
    const [audioMute, setAudioMute] = useState(false);
    const remoteStream = useRef(null);
    const localStream = useRef(null);
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const webSocket = useRef(null)
    const mapPeer = useRef([]);
    const [dcMsg, setDcMsg] = useState([])
    const [inputMsg, setInputMsg] = useState("")
    const showToast = useToast();

    let loc = window.location;
    let wssStart = "ws://";
    if(loc.protocol == "https:"){
        wssStart = "wss://";
    }
   //let endPoint = wssStart + `localhost:8000/class-room/${batchName}/`;
   let endPoint = wssStart + `${import.meta.env.VITE_DOMAIN_NAME || 'localhost:8000'}/class-room/${batchName}/`;
    useEffect(()=>{
        const constrains = {
            "video": {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                frameRate: { ideal: 15 },
                facingMode: "user"
            },
            "audio": {
                echoCancellation: true
            },
        };

        let userMedia = navigator.mediaDevices.getUserMedia(constrains)
                .then(stream =>{
                    localStream.current = stream;
                    if (localVideo.current) {
                        localVideo.current.srcObject = localStream.current;
                        localVideo.current.muted = true;
                }
                })
                .catch(error =>{
                    console.log("some error while accessing media devices - ", error);
                });

        // Cleanup WebSocket on component unmount
        return () => {
            console.log("cleanup function called...");
            if (webSocket.current) {
                webSocket.current.close();
            }
            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
            }
            if (remoteStream.current) {
                remoteStream.current.getTracks().forEach(track => track.stop());
            }
        };

    }, [batchName]);

    const handleJoinClassRomm = ()=>{
        if (btnJoinClass == "Connect"){
            setIsConnecting(true);
            setBtnJoinClass((prev)=>prev = (
            <>
            Connecting...<CircularProgress color='white' size="1rem" />
            </>
            ))
            webSocket.current = new WebSocket(endPoint, ['jwt', accessToken]);

            webSocket.current.onopen = () => {
                console.log('Connected to WebSocket');
            };

            webSocket.current.onmessage = (event) => webSocketOnMessage(event);

            webSocket.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                setBtnJoinClass((prev)=>prev = "Connect")
                setIsConnecting(false);
                showToast("You are disconnected.", "error", 3000);

                if (remoteStream.current) {
                    remoteStream.current.getTracks().forEach(track => track.stop());
                    remoteStream.current = null;
                }
                if (remoteVideo.current) {
                    remoteVideo.current.srcObject = null;
                }
                if(mapPeer.current){
                    if(mapPeer.current[0]){
                        mapPeer.current[0].close()
                    }
                    if(mapPeer.current[1]){
                        mapPeer.current[1].close()
                    }
                    mapPeer.current = []
                    setDcMsg([]);
                    console.log("Peer and dc closed with websocket onClose at student side...");                    
                }
            };

            webSocket.current.onerror = (error) => {
                console.log('Error occurred from WebSocket', error);
                setIsConnecting(false);
                showToast("Some error occured.", "error", 3000)
            };
            
        }
        else{
            setBtnJoinClass((prev)=>prev = "Connect");
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
        
        if(message == "Waiting for permission."){
            showToast(message, "success", 3000)
        }
        if(message == "Unautherized Entry. Try again"){
            showToast(message, "error", 3000)
            try{
                accessToken = refreshToken();
            }
            catch(error){
                console.log("error while refrshing token at student room", error);                
            }            
        }
        if(message == "Permission granted to join class"){
            showToast(message, "success", 3000)
            setBtnJoinClass((prev)=>prev = "Leave")
            setIsConnecting(false);
        }
        if(message == "Permission denied to join class"){
            showToast(message, "error", 3000)
            if (webSocket.current) {
              webSocket.current.close();
          }
        }
        if(message == "Class room not opened yet. Disconnecting..."){
            showToast(message, "error", 3000)
            if (webSocket.current) {
              webSocket.current.close();
          }
        }
        if(message == "class clossed"){
            showToast("class clossed by instructor. Dissconnecting...", "error", 3000)
        }
        if(message == "Duplicate student"){
            showToast("Duplicate student found. Dissconnecting...", "error", 3000)
        }
        if(action == "new-offer"){
            let offer = data["sdp"]
            const instructor_channel_name = data["instructor_channel_name"]
            const peerUserName = data["user"]
            createAnswer(offer, peerUserName, instructor_channel_name);
            return;
        }
        if (action === 'ice-candidate') {
            let candidate = new RTCIceCandidate(data.candidate);
            console.log("New ICE candidate received from instructor", candidate);
            mapPeer.current[0].addIceCandidate(candidate)
                .then(() => console.log("Added ICE candidate from instructor successfully."))
                .catch(error => console.error("Error adding received ICE candidate:", error));
        }
        if (action === 'student-removed') {
            console.log("student-removed action recieved");
            showToast("You are removed by instructor.", "error", 3000)
        }
    };

    function createAnswer(offer, peerUserName, instructor_channel_name){
        console.log("createAnswer called...");
        let peer = new RTCPeerConnection(iceConfiguration);
        
        mapPeer.current.push(peer);

        localStream.current.getTracks().forEach(track =>{
            peer.addTrack(track, localStream.current);
        })
        console.log("local stream added to peer...");

        remoteStream.current = new MediaStream();
        peer.ontrack = (event) => {
            console.log('Received remote stream from instructor:', peerUserName);
            event.streams[0].getTracks().forEach(track => {
                remoteStream.current.addTrack(track);
            });
    
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = remoteStream.current;
                remoteVideo.current.muted = false;
            }
        };

        peer.ondatachannel = (event) => {
            console.log("Data channel received:", event.channel);
            let dc = event.channel;
            mapPeer.current.push(dc); 
    
            dc.onmessage = (event) => {
                console.log(`Received message from instructor: ${event.data}`);
                // Handle messages
            };
    
            dc.onopen = () => {
                console.log("Data channel opened at student side.");
            };
    
            dc.onclose = () => {
                console.log("Data channel closed at student side.");
            };
        };

        peer.oniceconnectionstatechange = () => {
            let iceCS = peer.iceConnectionState;
            console.log('ICE connection state changed:', iceCS);
            
            if (iceCS === "failed"  || iceCS === "closed") {
                console.error('ICE connection failed/closed for instructor:', peerUserName);
                webSocket.current.close();
            } else if (peer.iceConnectionState === 'connected') {
                console.log('ICE connection established for peer:', peerUserName);
            }
        };
        peer.onicecandidate = (event) => {
            if(event.candidate){
                console.log("New ICE candidate:", event.candidate);
                const data = {
                    "action": "ice-candidate",
                    "user": user,
                    "receiver_channel_name": instructor_channel_name,
                    "candidate": event.candidate
                };
                const dataStr = JSON.stringify(data);
                webSocket.current.send(dataStr);
                console.log("Ice candidate send to instructor...");
            }            
        };

        peer.setRemoteDescription(offer)
            .then(()=>{
                console.log(`Remote description of instructor set successfully for student.`); 
                return peer.createAnswer();                     
            })
            .then(a => {
                console.log("Answer created from student...");
                return peer.setLocalDescription(a);
            })
            .then(()=>{
                console.log("local description set successfully");
                const data = {
                    "action": "new-answer",
                    "user": user,
                    "instructor_channel_name": instructor_channel_name,
                    "sdp": peer.localDescription
                }
                const dataStr = JSON.stringify(data)
                webSocket.current.send(dataStr)
                console.log("answer send to instructor...");
            })
            .catch(error => console.log("some error occured while create answer sdp...", error));
    };

    const handleMuteAudio = ()=>{
        setAudioMute(prev=> !prev)
        let audioTrack = localStream.current.getAudioTracks();
        audioTrack[0].enabled = !audioTrack[0].enabled
    }

    const handleVideoOff = ()=>{
        setVideoOff(prev => !prev)
        let videoTrack = localStream.current.getVideoTracks();
        videoTrack[0].enabled = !videoTrack[0].enabled
    }

    const handleMsgSend = ()=>{
        setDcMsg(prev=> [...prev, inputMsg]);
        const dc = mapPeer.current[1]
        const fullName = [firstName, lastName].filter(Boolean).join(" ") || user.split("@")[0];      
        const msg = `${fullName}:- ${inputMsg}`
        dc.send(msg)
        setInputMsg("");
    }

    
  return (
    <Container sx={{py:3}}>
        <Button
        onClick={()=> handleJoinClassRomm()}
        variant='contained'
        sx={{
            bgcolor: theme.palette.customColors,
            mb:2,
        }}
        disabled={isConnecting} 
        >
            {btnJoinClass}
        </Button>
        <Box
        sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            gap: 1,
        }}
        >
            <Box
            id="class-video-wrapper"
            sx={{ 
                borderRadius: "20px",
                width: ["100%", "100%", "75%"]
            }}
            >
                <video 
                id="class-video"
                ref={remoteVideo}
                width={"100%"}
                height={"100%"}
                autoPlay
                style={{
                    border: '3px solid gray', 
                    borderRadius: "20px",                
                    backgroundColor: "lightgray",
                }}
                >
                </video>
            </Box>
            <Box
            id="self-video-sec"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: ["100%", "100%", "25%"]
            }}
            >
                <Box 
                id= "local-video-wrapper"
                sx={{
                    width: "100%",
                }}
                >
                    <video 
                    id="local-video"
                    ref={localVideo}
                    width={"100%"}
                    autoPlay
                    style={{
                        marginBottom:10,
                        backgroundColor: "gray",
                        borderRadius: "20px",
                        border: '3px solid gray',
                    }}
                    >

                    </video>
                    <Box
                    id="btn-mute-wrapper"
                    >
                        <IconButton 
                        onClick={()=> handleMuteAudio()}
                        sx={{ color: "black", p: 0 }}>
                            {audioMute ? <MicOffIcon /> : <MicIcon />}
                        </IconButton>
                        <IconButton 
                        onClick={()=> handleVideoOff()}
                        sx={{ color: "black",  p: 0, ml:2}}>
                            {videoOff ?  <VideocamOffIcon />: <VideocamIcon />}
                        </IconButton>
                    </Box>
                </Box>
                <Box
                id="msg-wrapper"
                sx={{
                    mt:2,
                    p:2,
                    border: '3px solid gray',
                    borderRadius: "20px",                    
                }}
                >
                    <Box
                    id="msg-sec"
                    sx={{
                        height:"200px",
                        backgroundColor: "lightgray",
                        mb:1,
                        overflowY: "auto",
                    }}
                    >
                        <List>
                            {dcMsg.length > 0 ? (
                                dcMsg.map((msg, idx)=>(
                                    <ListItem key={idx}>
                                        {idx+1} - {msg}
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>
                                    No message yet.
                                </ListItem>
                            )
                            }
                        </List>
                    </Box>
                    <TextField                      
                    label="Ask question" 
                    variant="outlined"
                    value={inputMsg}
                    onChange={(e)=> setInputMsg(e.target.value)} 
                    sx={{
                        mb:1,
                        width:"100%",
                    }}
                    />
                    <Button 
                    id="btn-msg-send"
                    variant='contained'
                    sx={{
                        bgcolor: theme.palette.customColors,
                    }}
                    onClick={()=> handleMsgSend()}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default ClassRoom
