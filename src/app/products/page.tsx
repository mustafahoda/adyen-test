"use client";
import { GetStaticPaths } from "next";
import Image from "next/image";

import { Card, Space, Typography, Button } from "antd";

import data from "../../../public/data.json";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  price: number;
  name: string;
  description: string;
  imageUrl: string;
};

const Products: React.FunctionComponent = async () => {
  const router = useRouter();
  const PRODUCTS = data.products;

  function createAdyenSession(product: Product) {
    fetch(`http://localhost:3000/api/paymentSessions`, {
      method: "POST",
      body: JSON.stringify({ price: product.price }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        console.log("Successfully created Adyen Payment Session");

        // response
        //   .json()
        //   .then((data) => router.push(`/checkout/${data.response.id}`));

        let data = await response.json();
        router.push(`/checkout/${data.response.id}`);
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
          <Card
            title={product.name}
            key={product.id}
            cover={<img alt="test" src={product.imageUrl} />}
            style={{ width: 200 }}
          >
            <Typography>{product.description}</Typography>
            <Typography.Text strong>${product.price}</Typography.Text>
            <br></br>
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

export default Products;
