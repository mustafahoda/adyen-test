import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import data from "../../../../public/data.json";
import findProduct from "../../../../lib/findProduct";

type Props = {
  product: Array<{
    id: string;
    price: number;
    name: string;
    description: string;
  }>;
};

type Params = {
  params: {
    productId: string;
  };
};

export default async function CheckoutProduct({ params }: Params) {
  const { productId } = params;

  let productData = findProduct(productId);
  console.log(productData);

  return <h1>{productId}</h1>;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { productId: "1" } }, { params: { productId: "2" } }],
    fallback: false,
  };
};

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { params } = ctx;

//   const productId = params?.productId;
//   const PRODUCT_DATA = data.products;
//   console.log("Product Id is :" + productId);

//   for (const product of PRODUCT_DATA) {
//     if (product.id === productId) {
//       return { props: product };
//     }
//   }

//   return {
//     props: {},
//   };
// };
