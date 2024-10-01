"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sentence from "@/app/(components)/Sentence";
import useVoices from "@/app/(hooks)/useVoices";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { setSelectedVoice, handleSpeak, voices, selectedVoice } = useVoices();

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
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

      <div>
        {products.map((product) => {
          return (
            <div key={product._id} className="py-1">
              <Sentence 
                text={product.title} 
                handleSpeak={handleSpeak}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
