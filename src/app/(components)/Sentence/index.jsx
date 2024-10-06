"use client";

import { DeleteIcon, Edit, Volume2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sentence = ({ id, text, handleSpeak, handleDelete, image }) => {
  return (
    <div className="bg-blue-100 rounded-xl py-2 px-4">
      {image && <img className="w-40" src={image} alt="Image" />}
      <p className="text-xl">{text}</p>

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
