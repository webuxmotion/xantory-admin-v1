"use client";

import { useEffect, useState } from "react";

const useVoices = () => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    let utterance;

    const handleSpeak = (text) => {
      const synth = window.speechSynthesis;
  
      synth.cancel();
  
      utterance = new SpeechSynthesisUtterance(text);
  
      // Set selected voice, pitch, and rate
      if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      utterance.pitch = 1;
      utterance.rate = 1;
  
      synth.speak(utterance);
    };

    useEffect(() => {
        // Fetch available voices when the component mounts
        const loadVoices = () => {
          const synth = window.speechSynthesis;
          const availableVoices = synth.getVoices().filter(el => {
            return el.lang.includes('US');
          });
          setVoices(availableVoices);
    
          if (availableVoices.length > 0) {
            setSelectedVoice(availableVoices[47]); // Set default voice
          }
        };
    
        // Load voices immediately if they're available
        loadVoices();
    
        // Add event listener for voice changes (especially useful in some browsers like Chrome)
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }, []);

      return {
        handleSpeak,
        voices,
        setSelectedVoice,
        selectedVoice
      };
}

export default useVoices;