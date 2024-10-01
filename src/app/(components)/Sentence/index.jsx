"use client";

import { Volume2 } from "lucide-react";
import React from "react";

const Sentence = ({ text, handleSpeak }) => {

  return (
    <div className="bg-blue-100 rounded-xl py-2 px-4">
      <p className="text-xl">{text}</p>

      <button onClick={() => {
        handleSpeak(text)
      }}>
        <Volume2 />
      </button>
    </div>
  );
};

export default Sentence;
