"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductForm = (params) => {
  const [title, setTitle] = useState(params?.title || "");
  const [description, setDescription] = useState(params?.description || "");
  const [price, setPrice] = useState(params?.price || 0);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    if (params?._id) {
      data._id = params?._id;

      await axios.put("/api/products", data);
    } else {
      await axios.post("/api/products", data);
    }

    router.push("/products");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[800px]">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price (in USD)</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          updated
          <div>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
