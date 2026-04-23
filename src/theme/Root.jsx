import React from 'react';
import ChatwootWidget from '@site/src/components/ChatwootWidget';

export default function Root({ children }) {
  return (
    <>
      {children}
      <ChatwootWidget />
    </>
  );
}
