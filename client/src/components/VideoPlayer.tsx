import React, { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream;
  isMuted?: boolean;
}

const VideoPlayer: React.FC<Props> = ({ stream, isMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay muted={isMuted} style={{ width: '100%' }} />;
};

export default VideoPlayer;
