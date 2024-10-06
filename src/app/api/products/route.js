import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/app/api/(models)/Product";

export async function PUT(req) {
  await mongooseConnect();

  const data = await req.json();

  const { title, description, price, image, _id } = data;

  await Product.updateOne({ _id }, {
    title,
    description,
    price,
    image,
  });

  return NextResponse.json(true, { status: 200 });
}

export async function POST(req) {
  await mongooseConnect();

  const data = await req.json();

  const { title, description, price, image } = data;

  const productDoc = await Product.create({
    title,
    description,
    price,
    image,
  });

  return NextResponse.json(productDoc, { status: 200 });
}

export async function GET(req) {
  await mongooseConnect();

  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const product = await Product.findOne({ _id: id });

    return NextResponse.json(product, { status: 200 });
  }

  const products = await Product.find({});

  return NextResponse.json(products, { status: 200 });
}

export async function DELETE(req) {
  await mongooseConnect();

  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    await Product.deleteOne({ _id: id });

    return NextResponse.json(true, { status: 200 });
  }
}
