"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <Link className="btn-primary" href="/products/new">
        Add new
      </Link>

      <div>
        {products.map(product => {
          
          return (
            <div key={product._id}>
              {product.title}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
