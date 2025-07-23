import React, { useEffect, useState } from 'react';
import Peer from 'simple-peer';
import VideoPlayer from './VideoPlayer';

interface Props {
  peer: Peer.Instance;
}

const PeerVideo: React.FC<Props> = ({ peer }) => {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      setStream(stream);
    });
  }, [peer]);

  if (!stream) {
    return null;
  }

  return <VideoPlayer stream={stream} />;
};

export default PeerVideo;
