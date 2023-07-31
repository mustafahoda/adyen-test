import data from "../public/data.json";

export default function findProduct(productId: string) {
  const PRODUCTS = data.products;
  for (const product of PRODUCTS) {
    if (product.id === productId) {
      return { props: product };
    }
  }
}
