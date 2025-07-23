import { useState, useEffect } from 'react';

const useUserMedia = () => {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    getUserMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return stream;
};

export default useUserMedia;
