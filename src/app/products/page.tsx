import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <div>
      <Link className="btn-primary" href="/products/new">
        Add new
      </Link>
    </div>
  );
};

export default ProductsPage;
