"use client";

import {
  DeleteIcon,
  Edit,
  EyeIcon,
  EyeOff,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

let timer = "";

const Sentence = ({
  id,
  text,
  handleSpeak,
  handleDelete,
  image,
  mic,
  isTextShow,
  isListenGlobal,
  setIsListenGlobal,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    setIsShowingText(isTextShow);
  }, [isTextShow]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();

      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
        setIsListenGlobal(false);
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
      setIsListenGlobal(true);
    };

    mic.onresult = (event) => {
      clearTimeout(timer);

      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setNote(transcript);

      mic.onerror = (event) => {
        console.log(event.error);
      };

      timer = setTimeout(() => {
        setIsListening(false);
      }, 2000);
    };
  };

  return (
    <div className="bg-blue-100 rounded-xl py-2 px-4">
      {image && <img className="w-40" src={image} alt="Image" />}
      <button
        className="disabled:opacity-50"
        onClick={() => {
          setIsListening((prev) => !prev);
        }}
        disabled={isListenGlobal && !isListening}
      >
        {isListening ? <Mic /> : <MicOff />}{" "}
        {isListening && <span>Speaking...</span>}
      </button>
      <button
        className="ml-4"
        onClick={() => {
          setIsShowingText((prev) => !prev);
        }}
      >
        {isShowingText ? <EyeIcon /> : <EyeOff />}
      </button>
      <p className="text-xl">{note}</p>
      <p className="text-xl">{isShowingText ? text : "hidden"}</p>

      <div className="flex gap-10 pt-4">
        <button
          onClick={() => {
            handleSpeak(text);
          }}
        >
          <Volume2 />
        </button>

        <Link href={`/products/${id}`}>
          <Edit />
        </Link>

        <button
          onClick={() => {
            handleDelete(id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Sentence;
