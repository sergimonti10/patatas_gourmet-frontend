// LoadingWave.jsx
import React from 'react';
import { fontClasses } from '../fonts';
import { Card, Skeleton } from "@nextui-org/react";

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

export function LoadingCard() {
  return (
    <div className='flex justify-center items-center'>
      <Card className="w-[250px] h-[300px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
