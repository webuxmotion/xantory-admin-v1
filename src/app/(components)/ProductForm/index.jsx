"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductForm = (params) => {
  const [title, setTitle] = useState(params?.title || "");
  const [description, setDescription] = useState(params?.description || "");
  const [price, setPrice] = useState(params?.price || 0);
  const [image, setImage] = useState(params?.image || "");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    if (image) {
      data.image = image;
    }

    if (params?._id) {
      data._id = params?._id;

      await axios.put("/api/products", data);
    } else {
      await axios.post("/api/products", data);
    }

    router.push("/products");
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files?.length > 0) {
      const data = new FormData();
      
      data.append('file', files[0]);

      const res = await axios.post('/api/upload', data);

      setImage(res.data?.link);
    }
  }

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

          <label>Image</label>
          <div className="mb-2">
            {image ? (
              <div>
                <img 
                  src={image} 
                  alt="card picture" 
                  className="w-20"
                />
              </div>
            ) : (
              <div>No image</div>
            )}

            <label
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {}}>
              Upload
              <input 
                type="file" 
                className="hidden"
                onChange={uploadImage}
              />
            </label>
          </div>

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
