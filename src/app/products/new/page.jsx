"use client"

import axios from "axios";
import React, { useState } from "react";

const ProductNew = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const createProduct = async (event) => {
    event.preventDefault();
    const data = {
      title, description, price
    }

    await axios.post('/api/products', data);
  }

  return (
    <div>
      <h1>Create new product</h1>

      <form onSubmit={createProduct}>
      
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
          <button 
            type="submit"
            className="btn-primary"
          >Save</button>
        </div>
      </div>

      </form>
    </div>
  );
};

export default ProductNew;
