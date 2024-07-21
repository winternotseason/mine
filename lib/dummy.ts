interface Product {
  title: string;
  image: string;
  price: number;
  content: string;
  seller: string;
  uploadTime: Date;
}

export const dummyProducts: Product[] = [
  {
    title: "에스파 아마겟돈 앨범",
    image: "이미지 url",
    price: 25000,
    content: "미개봉입니다.",
    seller: "xitseo",
    uploadTime: new Date(),
  },
];
