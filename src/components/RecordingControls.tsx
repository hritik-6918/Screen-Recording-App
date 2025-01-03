import React from 'react';
import { Camera, Mic, Monitor, Pause, Square, Video } from 'lucide-react';
import { RecordingOptions } from '../types/recording';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  options: RecordingOptions;
  onOptionsChange: (options: RecordingOptions) => void;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onStopRecording: () => void;
}

export function RecordingControls({
  isRecording,
  isPaused,
  options,
  onOptionsChange,
  onStartRecording,
  onPauseRecording,
  onStopRecording,
}: RecordingControlsProps) {
  const toggleOption = (key: keyof Omit<RecordingOptions, 'quality'>) => {
    onOptionsChange({ ...options, [key]: !options[key as keyof RecordingOptions] });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => toggleOption('captureScreen')}
          className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all ${
            options.captureScreen 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Monitor size={24} />
          <span className="font-medium">Screen</span>
        </button>
        <button
          onClick={() => toggleOption('captureWebcam')}
          className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all ${
            options.captureWebcam 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Camera size={24} />
          <span className="font-medium">Webcam</span>
        </button>
        <button
          onClick={() => toggleOption('captureMicrophone')}
          className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all ${
            options.captureMicrophone 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Mic size={24} />
          <span className="font-medium">Microphone</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <select
          value={options.quality}
          onChange={(e) => onOptionsChange({ ...options, quality: e.target.value as RecordingOptions['quality'] })}
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4k">4K</option>
        </select>

        {!isRecording ? (
          <button
            onClick={onStartRecording}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
          >
            <Video size={20} />
            Start Recording
          </button>
        ) : (
          <>
            <button
              onClick={onPauseRecording}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-200"
            >
              <Pause size={20} />
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={onStopRecording}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors shadow-lg shadow-gray-200"
            >
              <Square size={20} />
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}