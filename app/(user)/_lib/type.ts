import { ObjectId } from "mongodb";

export interface IProduct {
  _id?: ObjectId;
  seller: string;
  imageUri: string;
  title: string;
  price: string;
  content: string;
  Hearts: string[];
  createAt: Date;
}

export interface User {
  _id?: ObjectId;
  id: string;
  name: string;
  selectedAvatar: number;
}
