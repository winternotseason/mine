import PlusButton from "@/components/plusbutton";
import { dummyProducts } from "@/lib/dummy";

// 등록된 상품들이 있는지? react-query로 불러오기
//

export default async function Home() {
  return (
    <div className="w-full h-full">
      <div>
        {dummyProducts.map((product) => (
          <div key={product.title}>
            {product.title}
            {product.price}
            {product.seller}
          </div>
        ))}
      </div>
      <PlusButton />
    </div>
  );
}
