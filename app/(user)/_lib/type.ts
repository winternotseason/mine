interface UserId {
  user_id: string;
}

interface IProduct {
  seller: string;
  imageUri: string;
  title: string;
  price: string;
  content: string;
  Hearts: UserId[];
  createAt : Date
}
