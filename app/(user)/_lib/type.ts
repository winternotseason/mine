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
  status?:number
}

export interface Category {
  category: string;
  count:number
}

export interface Region {
  _id?:ObjectId;
  state: string;
  cites: City[];
}

export interface City {
  cityname: string;
  count: number
}