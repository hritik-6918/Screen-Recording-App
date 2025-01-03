import React from 'react';
import { Recording } from '../types/recording';
import { Download, Trash2, Clock, Calendar } from 'lucide-react';

interface RecordingLibraryProps {
  recordings: Recording[];
  onDelete: (id: string) => void;
}

export function RecordingLibrary({ recordings, onDelete }: RecordingLibraryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (recordings.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recordings</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">No recordings yet. Start recording to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recordings</h2>
      <div className="grid gap-4">
        {recordings.map((recording) => (
          <div
            key={recording.id}
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{recording.name}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(recording.timestamp)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {formatDuration(recording.duration)}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {recording.quality}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={recording.url}
                download={recording.name}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Download"
              >
                <Download size={20} />
              </a>
              <button
                onClick={() => onDelete(recording.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}