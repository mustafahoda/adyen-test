import { GetStaticPaths, GetStaticProps } from "next";
// Fetching data from the JSON file
import Link from "next/link";

import { Card, Space, Typography, Button } from "antd";

import data from "../../../public/data.json";

const Products: React.FunctionComponent = async () => {
  const PRODUCTS = data.products;

  return (
    <Space>
      {PRODUCTS.map((product) => {
        return (
          <>
            <Card title={product.name}>
              <Typography>{product.description}</Typography>
              <Link href={`/checkout/${product.id}`}>
                <Button type="primary">Checkout!</Button>
              </Link>
            </Card>
          </>
        );
      })}
    </Space>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};

// Fetching data from the JSON file
// import fsPromises from "fs/promises";
// import path from "path";
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const filePath = path.join("public/products.json");
//   const jsonData = await fsPromises.readFile(filePath);

//   console.log(jsonData);
//   //   const objectData = JSON.parse(jsonData);

//   return {
//     props: { products },
//   };
// };

export default Products;
