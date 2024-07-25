import { address } from "@/lib/store/mapStore";
import { ObjectId } from "mongodb";

export interface IPost {
  _id?: ObjectId;
  writer: string;
  imageUri: string;
  title: string;
  menu: string;
  content: string;
  rating: number;
  address: address;
  createAt: Date;
}

export interface User {
  _id?: ObjectId;
  id: string;
  name: string;
  selectedAvatar: number;
}
