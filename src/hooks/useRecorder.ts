import { useState, useCallback, useRef } from 'react';
import { RecordingOptions, Recording } from '../types/recording';

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const startTime = useRef<number>(0);

  const startRecording = useCallback(async (options: RecordingOptions) => {
    try {
      const streams: MediaStream[] = [];

      if (options.captureScreen) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: options.quality === '4k' ? 3840 : options.quality === '1080p' ? 1920 : 1280,
            height: options.quality === '4k' ? 2160 : options.quality === '1080p' ? 1080 : 720,
          },
        });
        streams.push(screenStream);
      }

      if (options.captureWebcam) {
        const webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streams.push(webcamStream);
      }

      if (options.captureMicrophone) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streams.push(audioStream);
      }

      const combinedStream = new MediaStream([
        ...streams.flatMap(stream => stream.getTracks()),
      ]);

      mediaRecorder.current = new MediaRecorder(combinedStream);
      recordedChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.start();
      startTime.current = Date.now();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder.current && isRecording) {
      if (isPaused) {
        mediaRecorder.current.resume();
      } else {
        mediaRecorder.current.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [isRecording, isPaused]);

  const stopRecording = useCallback(() => {
    return new Promise<Recording>((resolve) => {
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const duration = (Date.now() - startTime.current) / 1000;

          const recording: Recording = {
            id: Date.now().toString(),
            name: `Recording ${new Date().toLocaleString()}.webm`,
            url,
            timestamp: Date.now(),
            duration,
            quality: '1080p',
          };

          mediaRecorder.current?.stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
          setIsPaused(false);
          resolve(recording);
        };

        mediaRecorder.current.stop();
      }
    });
  }, [isRecording]);

  return {
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    stopRecording,
  };
}