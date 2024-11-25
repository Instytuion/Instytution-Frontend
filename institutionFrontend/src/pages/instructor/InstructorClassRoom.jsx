import { useTheme } from '@emotion/react';
import { Box, Button, Container, Grid, IconButton, List, ListItem, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useToast from '../../hooks/useToast';
import {refreshToken} from '../../utils/axiosFunctions'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmationModal from '../../component/Modals/ConfirmModal';
import { startRecording, stopRecording} from '../../utils/recordVideo';


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

const InstructorClassRoom = () => {
    const theme = useTheme();
    const {batchName} = useParams();
    let user = useSelector((state)=> state.userAuth.email);
    let accessToken = useSelector((state)=> state.userAuth.accessToken);
    const [actionType, setActionType] = useState(null);
    const [selectedPeer, setSelectedPeer] = useState(null);
    const [selectedPeerChannel, setSelectedPeerChannel] = useState(null);
    const isPermitted = useRef(false)
    const [btnOpenClass, setBtnOpenClass] = useState("Open Class Room")
    const [isConnecting, setIsConnecting] = useState(false);
    const [videoOff, setVideoOff] = useState({[user]: false});
    const [audioMute, setAudioMute] = useState({[user]: false});
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const videoStreams = useRef({[user]: React.createRef()});
    const [videoList, setVideoList] = useState([]);
    const mapPeers = useRef({});
    const webSocket = useRef(null);
    const [dcMsg, setDcMsg] = useState([])
    const showToast = useToast();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [recordBtn, setRecordBtn] = useState("Record");
    const [isRecording, setIsRecording] = useState(false)
    const videoChunkSerial = useRef(0)
    const recordIdList = useRef([])
    const [disableRecord, setDisableRecord] = useState(true)

    const openStudentRemoveModal = (peerUser)=>{
        setSelectedPeer(peerUser)
        setActionType("Remove")
        setOpenConfirmModal(true);
    }
    const handleConfirmModalClose = ()=> {
        setOpenConfirmModal(false);        
        if(!isPermitted.current && actionType == "Permit"){
            const data = {
                "student_channel_name": selectedPeerChannel,
                "message": "student_dissallowed"
            }
            const dataStr = JSON.stringify(data)
            webSocket.current.send(dataStr)
        }
        isPermitted.current = false;
        setSelectedPeer(null);
        setSelectedPeerChannel(null);
        setActionType(null);
    }
    
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
                    if (videoStreams.current[user]) {
                        localStream.current = stream
                        videoStreams.current[user].current.srcObject = localStream.current;
                        videoStreams.current[user].current.muted = true;
                }
                })
                .catch(error =>{
                    console.log("some error while accessing media devices - ", error);
                });

        // Cleanup WebSocket and media streams on component unmount
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
                setDisableRecord(false)
                setBtnOpenClass((prev)=>prev = "Close Class Room")
                setIsConnecting(false);
            };

            webSocket.current.onmessage = (event) => webSocketOnMessage(event);

            webSocket.current.onclose = () => {
                console.log('Disconnected from WebSocket');
                if(isRecording){
                    stopRecording(showToast, recordIdList);
                    setRecordBtn("Record")
                    setIsRecording(false);
                }
                setBtnOpenClass((prev)=>prev = "Open Class Room");
                setIsConnecting(false);
                setDisableRecord(true);
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

                //close each peer connection
                Object.keys(mapPeers.current).forEach(peerUserName => {
                    let peer = mapPeers.current[peerUserName][0];
                    let dc = mapPeers.current[peerUserName][1];
                    if (peer && peer.connectionState !== "closed") {
                        peer.close();
                    }
                
                    if (dc && dc.readyState !== "closed") {
                        dc.close();
                    }
                });
                setVideoList(prev=> [])
                mapPeers.current = {}
                setDcMsg([])
                videoChunkSerial.current = 0
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

        if(message == "Unautherized Entry. Try again"){
            showToast(message, "error", 3000)
            try{
                accessToken = refreshToken();
            }
            catch(error){
                console.log("error while refrshing token at instructor room", error);                
            }            
        }
        
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
            console.log("new peer action recieved from student...",peerUserName);
            setActionType("Permit");
            setSelectedPeer(peerUserName);
            setSelectedPeerChannel(student_channel_name);
            setOpenConfirmModal(true);
        }
        if(action == 'new-answer'){
            console.log("new answer action received...");
            console.log("peerUserName recieved is...", peerUserName);
            let answer = data["sdp"];
            let peer = mapPeers.current[peerUserName][0];
            peer.setRemoteDescription(answer);
            return
        }
        if(action == 'student-close'){
            console.log("student-close action received for student", peerUserName);
            setVideoList(prevList => prevList.filter(user => user !== peerUserName));
            showToast(`${peerUserName} disconnected`, "error", 3000)
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

        let dc = peer.createDataChannel("channel");
        dc.onmessage = (event) => {
            console.log(`Received dc message from student ${peerUserName}: ${event.data}`);
            setDcMsg(prev=> [...prev, event.data])
        };
    
        dc.onopen = () => {
            console.log("Data channel opened with student:", peerUserName);
        };
    
        dc.onclose = () => {
            console.log("Data channel closed with student:", peerUserName);
        };

        peer.oniceconnectionstatechange = () => {
            console.log('ICE connection state changed:', peer.iceConnectionState);
            let iceCS = peer.iceConnectionState;
            if (iceCS === "failed" || iceCS === "disconnected" || iceCS === "closed") {
                console.error('ICE connection failed/closed/disconnected for student:', peerUserName);
                if (videoStreams.current[peerUserName] && videoStreams.current[peerUserName].current) {
                    videoStreams.current[peerUserName].current.srcObject.getTracks().forEach(track => {
                        track.stop(); 
                    });
                    videoStreams.current[peerUserName].current.srcObject = null;
                    console.log("Media stream stopped closed for student:", peerUserName);
                }
                try {
                    if (mapPeers.current[peerUserName][0]) {
                        mapPeers.current[peerUserName][0].close();
                        console.log("Peer closed for student:", peerUserName);
                    }
                    if (mapPeers.current[peerUserName][1]) {
                        mapPeers.current[peerUserName][1].close();
                        console.log("DC closed for student:", peerUserName);
                    }
                } catch (error) {
                    console.error("Error closing connections for student:", peerUserName, error);
                }
                setVideoList(prevList => prevList.filter(user => user !== peerUserName));
                delete mapPeers.current[peerUserName];
                delete videoStreams.current[peerUserName];
                 
            } else if (peer.iceConnectionState === 'connected') {
                console.log('ICE connection established for student:', peerUserName);
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
                mapPeers.current[peerUserName] = [peer, dc, student_channel_name]
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

    const confirmStudentRemove = (peerUser)=>{
        const student_channel_name = mapPeers.current[peerUser][2]
        const data = {
            "action": "student-removed",
            "student_channel_name": student_channel_name,
        }
        const dataStr = JSON.stringify(data)
        webSocket.current.send(dataStr)
        console.log("student removed send for...", peerUser);
    }

    const confirmStudentPermit = (peerUserName)=>{        
        const data = {
            "student_email": peerUserName,
            "student_channel_name": selectedPeerChannel,
            "message": "student_allowed"
        }
        const dataStr = JSON.stringify(data)
        webSocket.current.send(dataStr)
        createOffer(peerUserName, selectedPeerChannel);
        return;        
    }

    const handleRecordVideo = ()=>{
        if(recordBtn == "Record"){
            setIsRecording(true);
            setRecordBtn("Stop Recording...");
            startRecording(localStream.current, batchName, videoChunkSerial, recordIdList);
        }
        if(recordBtn == "Stop Recording..."){
            setIsRecording(false);
            setRecordBtn("Record")
            stopRecording(showToast, recordIdList);
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

        <Button
        onClick={()=> handleRecordVideo()}
        variant='outlined'
        color='success'
        disabled={disableRecord}
        sx={{
            mb:2,
            ml:2,
        }} 
        >
            {recordBtn}
        </Button>
        <Box
        sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            gap: 1,
        }}
        >
            <Box
            id="student-videos"
            sx={{ 
                borderRadius: "20px",
                border: '3px solid gray',
                p: 1 ,
                backgroundColor: "lightgray",
                width: ["100%", "100%", "75%"],
                minHeight: "80vh",                
            }}
            >
                <Grid container spacing={2}>
                    {Array.isArray(videoList) && videoList.length > 0 ? (
                        videoList.map((peerUser)=>(
                            <Grid item xs={12} md={6} lg={4} key={peerUser}>
                                <Box
                                id="video-wrapper"
                                sx={{ 
                                    border: '1px solid black',
                                    borderRadius: "20px",
                                    backgroundColor: "gray",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '300px',
                                    overflowY: 'hidden',
                                    position: "relative",
                                }}
                                >
                                    <video 
                                    id="grid-video"
                                    ref={videoStreams.current[peerUser]}
                                    autoPlay
                                    style={{
                                        flex: '1 1 auto',
                                        marginBottom:1,
                                        borderTopLeftRadius: "20px",
                                        borderTopRightRadius: "20px",
                                        objectFit: "cover",
                                        width: '100%',
                                        maxHeight: '250px',
                                    }}
                                    >
                                    </video>
                                    <Box
                                    id="students-btn-mute-wrapper"
                                    >
                                        <IconButton 
                                        onClick={()=> handleMuteAudio(peerUser)}
                                        sx={{ color: "white", py: 0 }}>
                                            {audioMute[peerUser] ? <MicOffIcon /> : <MicIcon />}
                                        </IconButton>
                                        <IconButton 
                                        onClick={()=> handleVideoOff(peerUser)}
                                        sx={{ color: "white",  py: 0}}>
                                            {videoOff[peerUser] ? <VideocamOffIcon /> : <VideocamIcon />}
                                        </IconButton>
                                        <Typography 
                                        color='white' 
                                        px={2}
                                        sx={{
                                            fontSize: [14, 14, 16],
                                        }}
                                        >
                                            {peerUser}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                    onClick={()=> openStudentRemoveModal(peerUser)}
                                    sx={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                    }}
                                    >
                                        <CloseRoundedIcon
                                        sx={{
                                            fontSize: "40px",
                                            color: "grey.700",
                                        }}
                                        />
                                    </IconButton>
                                </Box>                
                            </Grid>
                        ))) : (
                            <Typography
                            color='red'
                            sx={{
                                mx:"auto",
                                p:3,
                            }}
                            >
                                No students joined.
                            </Typography>
                        )
                    }
                </Grid>
            </Box>

            <Box
            id="instructor-video"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: ["100%", "100%", "25%"]
            }}
            >
                <video 
                id="local-video"
                ref={videoStreams.current[user]}
                width={"100%"}
                autoPlay
                style={{
                    marginBottom:1,
                    backgroundColor: "gray",
                    borderRadius: "20px",
                    border: '3px solid gray',
                }}
                >
                </video>
                <Box
                id="instructor-btn-mute-wrapper"
                >
                    <IconButton 
                    onClick={()=> handleMuteAudio(user)}
                    sx={{ color: "black",  p: 0}}>
                        {audioMute[user] ? <MicOffIcon /> : <MicIcon />}
                    </IconButton>
                    <IconButton 
                    onClick={()=> handleVideoOff(user)}
                    sx={{ color: "black",  p: 0, ml:2}}>
                        {videoOff[user] ? <VideocamOffIcon /> : <VideocamIcon />}
                    </IconButton>
                </Box>
            </Box>
        </Box>
        <Box
        id="question-sec"
        sx={{
            borderRadius: "20px",
            border: '3px solid gray',
            mt: 1,
            p:1,
            minHeight: "100px",
            maxHeight: "400px",
            overflowY: "auto",
        }}
        >
            <Typography
            sx={{
                borderBottom: "2px solid gray",
                display:"inline-block",
                mb:1,
            }}
            >
                Questions
            </Typography>
            <List>
                {dcMsg.length > 0 ? (
                    dcMsg.map((msg, idx)=>(
                        <ListItem key={idx}>
                            {msg}
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        No questions yet.
                    </ListItem>
                )
                }
            </List>
        </Box>
        <ConfirmationModal 
        open={openConfirmModal}
        onClose={handleConfirmModalClose}
        actionType={actionType}
        email={selectedPeer}
        isPermitted={isPermitted}
        onConfirm={actionType == "Permit" ? confirmStudentPermit : confirmStudentRemove}
        />
    </Container>
  )
}

export default InstructorClassRoom
