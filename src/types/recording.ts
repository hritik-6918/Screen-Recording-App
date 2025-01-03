export type RecordingQuality = '720p' | '1080p' | '4k';

export interface RecordingOptions {
  captureScreen: boolean;
  captureWebcam: boolean;
  captureMicrophone: boolean;
  quality: RecordingQuality;
}

export interface Recording {
  id: string;
  name: string;
  url: string;
  timestamp: number;
  duration: number;
  quality: RecordingQuality;
}