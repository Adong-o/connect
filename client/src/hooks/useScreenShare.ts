import { useState } from 'react';
import Peer from 'simple-peer';

const useScreenShare = (peersRef: React.MutableRefObject<Array<{ peerID: string; peer: Peer.Instance; }>>, localStream?: MediaStream) => {
  const [screenStream, setScreenStream] = useState<MediaStream>();

  const shareScreen = () => {
    if (!localStream) return;
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then((stream) => {
        setScreenStream(stream);
        const screenTrack = stream.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          peer.replaceTrack(localStream.getVideoTracks()[0], screenTrack, localStream);
        });

        screenTrack.onended = () => {
          stopScreenShare(stream);
        };
      });
  };

  const stopScreenShare = (streamToStop?: MediaStream) => {
    const stream = streamToStop || screenStream;
    if (!stream || !localStream) return;

    stream.getTracks().forEach((track) => track.stop());
    setScreenStream(undefined);
    peersRef.current.forEach(({ peer }) => {
      peer.replaceTrack(stream.getVideoTracks()[0], localStream.getVideoTracks()[0], localStream);
    });
  };

  return { screenStream, shareScreen, stopScreenShare };
};

export default useScreenShare;
