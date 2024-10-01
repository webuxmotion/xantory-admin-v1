import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/app/api/(models)/Product";

export async function POST(req) {
  await mongooseConnect();

  const data = await req.json();

  const { title, description, price } = data;

  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return NextResponse.json(productDoc, { status: 200 });
}

export async function GET(req) {
  await mongooseConnect();

  const products = await Product.find({});

  return NextResponse.json(products, { status: 200 });
}
