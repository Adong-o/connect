import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Peer from 'simple-peer';

const useWebRTC = (roomId: string, localStream?: MediaStream) => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<Array<{ peerID: string; peer: Peer.Instance }>>([]);

  useEffect(() => {
    if (!localStream) return;

    socketRef.current = io('http://localhost:8080');
    socketRef.current.emit('join-room', roomId);

    socketRef.current.on('user-connected', (userId: string) => {
      if (socketRef.current) {
        const peer = createPeer(userId, socketRef.current.id, localStream);
        peersRef.current.push({ peerID: userId, peer });
        setPeers((prevPeers) => [...prevPeers, peer]);
      }
    });

    socketRef.current.on('offer', (payload: { source: string; signal: Peer.SignalData }) => {
      const peer = addPeer(payload.signal, payload.source, localStream);
      peersRef.current.push({ peerID: payload.source, peer });
      setPeers((prevPeers) => [...prevPeers, peer]);
    });

    socketRef.current.on('answer', (payload: { source: string; signal: Peer.SignalData }) => {
      const item = peersRef.current.find((p) => p.peerID === payload.source);
      item?.peer.signal(payload.signal);
    });

    socketRef.current.on('user-disconnected', (userId: string) => {
      const item = peersRef.current.find((p) => p.peerID === userId);
      item?.peer.destroy();
      const newPeers = peersRef.current.filter((p) => p.peerID !== userId);
      peersRef.current = newPeers;
      setPeers(newPeers.map((p) => p.peer));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, localStream]);

  const createPeer = (userToSignal: string, callerID: string, stream: MediaStream): Peer.Instance => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (signal) => {
      socketRef.current?.emit('offer', { target: userToSignal, callerID, signal });
    });
    return peer;
  };

  const addPeer = (incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream): Peer.Instance => {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (signal) => {
      socketRef.current?.emit('answer', { target: callerID, signal });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  return { peers, peersRef };
};

export default useWebRTC;
