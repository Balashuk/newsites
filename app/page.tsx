export const revalidate = 0;
import Container from "./components/Container";
import HomeBaner from "./components/HomeBanner";
import ProductCart from "./components/products/ProductCart";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: Promise<IProductParams>; // Using Promise for the type
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams; // Awaiting the promise
  const products = await getProducts(resolvedSearchParams); // Using resolved params

  if (products.length === 0) {
    return (
      <NullData title="Товар не знайдено, виберіть іншу категорію або натисніть Всі" />
    );
  }

  // Function to shuffle an array
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffleProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBaner />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffleProducts.map((product: any) => (
            <ProductCart key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
