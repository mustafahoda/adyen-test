import { GetStaticPaths } from "next";

const Checkout = () => {
  return <h1>Checkout Landing Page</h1>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   return {
//     props: {},
//   };
// };

export default Checkout;
