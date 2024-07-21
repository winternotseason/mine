interface UserId {
  user_id: string;
}

interface Product {
  seller: string;
  imageUrl: string;
  title: string;
  price: number;
  content: string;
  Hearts: UserId[];
  createAt : Date
}
