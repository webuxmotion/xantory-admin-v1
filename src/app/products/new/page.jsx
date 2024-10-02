"use client";

import axios from "axios";
import React, { useState } from "react";
import ProductForm from '@/app/(components)/ProductForm';

const ProductNew = () => {

  return (
    <div>
      <h1>Create new product</h1>

      <ProductForm />
    </div>
  );
};

export default ProductNew;
