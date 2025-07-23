import React from 'react';
import VideoPlayer from './VideoPlayer';
import PeerVideo from './PeerVideo';
import useUserMedia from '../hooks/useUserMedia';
import useWebRTC from '../hooks/useWebRTC';
import useScreenShare from '../hooks/useScreenShare';

const Room: React.FC = () => {
  const roomId = window.location.pathname.substring(1) || 'default-room';
  const localStream = useUserMedia();
  const { peers, peersRef } = useWebRTC(roomId, localStream);
  const { screenStream, shareScreen, stopScreenShare } = useScreenShare(peersRef, localStream);

  return (
    <div>
      <div>
        {localStream && <VideoPlayer stream={screenStream || localStream} isMuted />}
        {peers.map((peer, index) => (
          <PeerVideo key={index} peer={peer} />
        ))}
      </div>
      <div>
        {screenStream ? (
          <button onClick={() => stopScreenShare()}>Stop Sharing</button>
        ) : (
          <button onClick={shareScreen}>Share Screen</button>
        )}
      </div>
    </div>
  );
};

export default Room;
