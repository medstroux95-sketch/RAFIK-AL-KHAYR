import React from 'react';
import MyAccountClient from './MyAccountClient';

export default function MyAccountPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <MyAccountClient />
      </div>
    </div>
  );
}
