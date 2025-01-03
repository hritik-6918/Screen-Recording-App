import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecordingControls } from './components/RecordingControls';
import { RecordingLibrary } from './components/RecordingLibrary';
import { useRecorder } from './hooks/useRecorder';
import { Recording, RecordingOptions } from './types/recording';

function App() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [options, setOptions] = useState<RecordingOptions>({
    captureScreen: true,
    captureWebcam: false,
    captureMicrophone: true,
    quality: '1080p',
  });

  const { isRecording, isPaused, startRecording, pauseRecording, stopRecording } = useRecorder();

  const handleStartRecording = async () => {
    await startRecording(options);
  };

  const handleStopRecording = async () => {
    const recording = await stopRecording();
    setRecordings(prev => [...prev, recording]);
  };

  const handleDeleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full py-8 px-4">
        <Header />
        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          options={options}
          onOptionsChange={setOptions}
          onStartRecording={handleStartRecording}
          onPauseRecording={pauseRecording}
          onStopRecording={handleStopRecording}
        />
        <RecordingLibrary
          recordings={recordings}
          onDelete={handleDeleteRecording}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;