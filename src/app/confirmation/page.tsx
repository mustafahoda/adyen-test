"use client";
import { Typography } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
const { Title } = Typography;

export default function ConfirmationPage() {
  return (
    <div>
      <h1>Payment Confirmed!</h1>
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [],
//     fallback: false,
//   };
// };
