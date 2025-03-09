'use client'
import { useEffect } from "react"
import { collection, doc, setDoc, getDoc, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../util/firebase";
export default function Video() {
    useEffect(() => {
        const servers = {
            iceServers: [
              {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
              },
            ],
            iceCandidatePoolSize: 10,
          };
          
        
        const pc = new RTCPeerConnection(servers);
        let localStream: MediaStream | null = null;
        let remoteStream: MediaStream | null = null;
        
        const webcamButton = document.getElementById("webcamButton") as HTMLButtonElement;
        const webcamVideo = document.getElementById("webcamVideo") as HTMLVideoElement;
        const callButton = document.getElementById("callButton") as HTMLButtonElement;
        const callInput = document.getElementById("callInput") as HTMLInputElement;
        const answerButton = document.getElementById("answerButton") as HTMLButtonElement;
        const remoteVideo = document.getElementById("remoteVideo") as HTMLVideoElement;
        const hangupButton = document.getElementById("hangupButton") as HTMLButtonElement;
        
        if (!webcamButton || !webcamVideo || !remoteVideo || !callButton || !hangupButton || !callInput || !answerButton) return;
        webcamButton.onclick = async () => {
        
          localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          remoteStream = new MediaStream();
        
          localStream.getTracks().forEach((track) => localStream && pc.addTrack(track, localStream));
        
          pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => remoteStream && remoteStream.addTrack(track));
          };
        
          webcamVideo.srcObject = localStream;
          remoteVideo.srcObject = remoteStream;
        
          callButton.disabled = false;
          answerButton.disabled = false;
          webcamButton.disabled = true;
        };
        
        // Create an offer
        callButton.onclick = async () => {
          const callDocRef = doc(collection(db, "calls"));
          const offerCandidatesRef = collection(callDocRef, "offerCandidates");
          const answerCandidatesRef = collection(callDocRef, "answerCandidates");
        
          callInput.value = callDocRef.id;
        
          pc.onicecandidate = async (event) => {
            if (event.candidate) {
              await addDoc(offerCandidatesRef, event.candidate.toJSON());
            }
          };
        
          const offerDescription = await pc.createOffer();
          await pc.setLocalDescription(offerDescription);
        
          await setDoc(callDocRef, { offer: { sdp: offerDescription.sdp, type: offerDescription.type } });
        
          onSnapshot(callDocRef, (snapshot) => {
        
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
              const answerDescription = new RTCSessionDescription(data.answer);
              pc.setRemoteDescription(answerDescription);
            }
          });
        
          onSnapshot(answerCandidatesRef, (snapshot) => {
        
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.addIceCandidate(candidate);
              }
            });
          });
        
          hangupButton.disabled = false;
        };
        
        answerButton.onclick = async () => {
          const callId = callInput.value;
          const callDocRef = doc(db, "calls", callId);
          const answerCandidatesRef = collection(callDocRef, "answerCandidates");
          const offerCandidatesRef = collection(callDocRef, "offerCandidates");
        
          pc.onicecandidate = async (event) => {
            if (event.candidate) {
              await addDoc(answerCandidatesRef, event.candidate.toJSON());
            }
          };
        
          const callSnapshot = await getDoc(callDocRef);
          const callData = callSnapshot.data();
        
          if (!callData) {
            console.error("Call data not found");
            return;
          }
        
          const offerDescription = callData.offer;
          await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
        
          const answerDescription = await pc.createAnswer();
          await pc.setLocalDescription(answerDescription);
        
          await setDoc(callDocRef, { answer: { type: answerDescription.type, sdp: answerDescription.sdp } });
        
          onSnapshot(offerCandidatesRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const data = change.doc.data();
                pc.addIceCandidate(new RTCIceCandidate(data));
              }
            });
          });
        };
    }, [])
    return (
        <>
        <head>
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Video Demo</title>
  </head>
  <body>
    <h2>1. Start your Webcam</h2>
    <div className="videos">
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoPlay playsInline></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoPlay playsInline></video>
      </span>


    </div>

    <button id="webcamButton">Start webcam</button>
    <h2>2. Create a new Call</h2>
    <button id="callButton" disabled>Create Call (offer)</button>

    <h2>3. Join a Call</h2>
    <p>Answer the call from a different browser window or device</p>
    
    <input id="callInput" />
    <button id="answerButton" disabled>Answer</button>

    <h2>4. Hangup</h2>

    <button id="hangupButton" disabled>Hangup</button>

    {/* <script type="module" src="/main.js"></script> */}

  </body>
  </>
    )
}