"use client";
import { GetStaticPaths } from "next";
import { useEffect } from "react";
import { adyenConfig } from "@/../public/adyenConfig";

import "@adyen/adyen-web/dist/adyen.css";
import AdyenCheckout from "@adyen/adyen-web";

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  // Extract Adyen Session ID from URL
  const ADYEN_SESSION_ID = params.id;

  async function retrieveSessionData(): Promise<Response> {
    return fetch(
      `http://localhost:3000/api/paymentSessions?sessionId=${ADYEN_SESSION_ID}`
    )
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  // On Initial Load, Inject values of the Drop In Configuration
  useEffect(() => {
    retrieveSessionData().then(async (response: any) => {
      let data = await response.json();
      console.log(data);

      adyenConfig.session.id = data.id;
      adyenConfig.session.sessionData = data.sessionData;

      const checkout = await AdyenCheckout(adyenConfig);

      const dropinComponent = checkout
        .create("dropin")
        .mount("#dropin-container");
    });
  }, []);

  // return <h1>Testing Checkout ID</h1>;
  return <div id="dropin-container"></div>;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};
