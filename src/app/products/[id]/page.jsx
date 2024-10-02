"use client"

import ProductForm from "@/app/(components)/ProductForm";
import axios from "axios";
import { useEffect, useState } from "react";

const EditProduct = ({ params: { id }}) => {
  const [product, setProduct] = useState(null);

    useEffect(() => {
      axios.get(`/api/products?id=${id}`).then(response => {
        setProduct(response.data);
      })
    }, [id]);

  return (
    <div>
      <h1>Edit product</h1>

      {product && <ProductForm {...product} />}
      
    </div>
  )
}

export default EditProduct;