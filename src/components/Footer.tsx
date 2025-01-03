import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-6 text-center text-gray-600">
      <p className="flex items-center justify-center gap-2">
        Built by hritik6918{' '}
        <Heart size={16} className="text-red-500 fill-current animate-pulse" />
      </p>
    </footer>
  );
}