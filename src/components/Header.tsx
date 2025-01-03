import React from 'react';
import { Video } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500 text-white rounded-xl">
        <Video size={32} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Screen Recorder</h1>
        <p className="text-gray-500">Record your screen, webcam, and audio with ease</p>
      </div>
    </div>
  );
}