import { model, models, Schema } from "mongoose";

const ProductShema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    }
});

export const Product = models.product || model('product', ProductShema);

