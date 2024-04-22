// src/models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  user: IUser['_id'];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<IProduct>('Product', ProductSchema);