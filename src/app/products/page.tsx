"use client";
import { GetStaticPaths, GetStaticProps } from "next";

import { Card, Space, Typography, Button } from "antd";

import data from "../../../public/data.json";

type Product = {
  id: string;
  price: number;
  name: string;
  description: string;
};

const Products: React.FunctionComponent = async () => {
  const PRODUCTS = data.products;

  function createAdyenSession(product: Product) {
    fetch(`http://localhost:3000/api/paymentSessions?productId=1`, {
      method: "POST",
    })
      .then((response) => {
        console.log("Successfully created Adyen Payment Session");
      })
      .catch((error) => {
        console.log("An error occurred when creating Adyen Payment Session");
      })
      .finally(() => console.log("okay done"));
  }

  return (
    <Space>
      {PRODUCTS.map((product) => {
        return (
          <Card title={product.name} key={product.id}>
            <Typography>{product.description}</Typography>
            <Button
              value={product.id}
              type="primary"
              onClick={() => createAdyenSession(product)}
            >
              Checkout!
            </Button>
          </Card>
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
