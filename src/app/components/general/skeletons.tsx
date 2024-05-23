// LoadingWave.jsx
import React from 'react';
import { fontClasses } from '../fonts';

const waveAnimation = 'inline-block animate-wave';

export function LoadingWave() {
  const text = 'PatatasGourmet...';
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`text-2xl sm:text-3xl text-amber-950 ${fontClasses['font-pinyon']}`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={waveAnimation}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
