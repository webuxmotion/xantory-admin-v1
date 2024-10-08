"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sentence from "@/app/(components)/Sentence";
import useVoices from "@/app/(hooks)/useVoices";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SpeechToText from "../(components)/SpeechToText";

let mic = null;

if (typeof window !== "undefined") {
  const SpeechRecognition =
    window && (window?.SpeechRecognition || window?.webkitSpeechRecognition);
  mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";
}

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isTextShow, setIsTextShow] = useState(true);
  const { setSelectedVoice, handleSpeak, voices, selectedVoice } = useVoices();
  const [isListen, setIsListen] = useState(false);

  const getProducts = () => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios.delete(`/api/products?id=${id}`).then((_) => {
              getProducts();
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <Link className="btn-primary" href="/products/new">
          Add new
        </Link>
      </div>

      <select
        value={voices.indexOf(selectedVoice)}
        onChange={(e) => setSelectedVoice(voices[e.target.value])}
        className="bg-blue-100"
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {index}: {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <label className="ml-5 cursor-pointer">
        <input
          type="checkbox"
          onChange={() => {
            setIsTextShow((prev) => !prev);
          }}
          checked={isTextShow}
        />
        <span className="ml-2">{isTextShow ? "Hide text" : "Show text"}</span>
      </label>

      <div>
        {products.map((product) => {
          return (
            <div key={product._id} className="py-1">
              <Sentence
                id={product._id}
                text={product.title}
                handleSpeak={handleSpeak}
                handleDelete={handleDelete}
                image={product?.image}
                mic={mic}
                isTextShow={isTextShow}
                isListenGlobal={isListen}
                setIsListenGlobal={setIsListen}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
