export const revalidate=0;

import Container from "./components/Container";
import HomeBaner from "./components/HomeBanner";
import ProductCart from "./components/products/ProductCart";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

// Додаємо тип для продуктів, щоб уникнути використання `any`
interface IProduct {
  id: string;
  name: string;
  price: number;
  // Додайте інші властивості продуктів, якщо потрібно
}

interface HomeProps {
  searchParams: Promise<IProductParams>; // searchParams тепер є Promise
}

export default async function Home({ searchParams }: HomeProps) {
  // Ожидаємо параметри пошуку
  const {  category } = await searchParams;

  // Отримуємо продукти за параметрами
  const products = await getProducts({ category });

  if (products.length === 0) {
    return <NullData title="Товар не знайдено. Виберіть іншу категорію або натисніть 'Всі'" />;
  }

  // Функція для перемішування масиву продуктів
  function shuffleArray(array: IProduct[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Перемішуємо продукти
  const shuffleProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBaner />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffleProducts.map((product: IProduct) => {
            return <ProductCart data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
