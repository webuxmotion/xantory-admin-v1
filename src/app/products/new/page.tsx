import React from "react";

const ProductNew = () => {
  return (
    <div>
      <p>Home -> Products -> New Product</p>
      <h1>Create new product</h1>

      <div className="flex flex-col max-w-[800px]">
        <label>Product Name</label>
        <input type="text" placeholder="Product name" />

        <label>Description</label>
        <textarea placeholder="Description" />

        <label>Price (in USD)</label>
        <input type="number" placeholder="Price" />

        <div>
          <button className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
