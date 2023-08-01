import { NextRequest, NextResponse } from "next/server";
import { CheckoutAPI, Client } from "@adyen/api-library";

// import NodeCache from "node-cache";
// const sessionCache = new NodeCache();

import { createClient } from "redis";
const redisClient = createClient();

const adyenClient = new Client({
  apiKey: process.env.ADYEN_API_KEY!,
  environment: "TEST",
});
const checkout = new CheckoutAPI(adyenClient);

type Params = {
  sessionId: string;
};

export async function POST(request: NextRequest) {
  console.log("Incoming request to create Adyen Payment Session");
  const body = await request.json();

  console.log(body);

  if (typeof body.price !== "number") {
    return NextResponse.json(
      {
        error: "Price provided is not of type number",
        success: false,
      },
      { status: 500 }
    );
  }

  const price = body.price * 100;

  console.log(typeof price);

  return checkout
    .sessions({
      amount: { currency: "USD", value: price },
      reference: "SalespromptTest1",
      returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..", // TODO: Fix this
      merchantAccount: "SalespromptECOM",
    })
    .then(async (response) => {
      console.log("Successfully created Adyen Payment Session");

      // let cacheResponse = sessionCache.set(response.id, response);
      // console.log(cacheResponse);

      await redisClient.connect();
      await redisClient.set(response.id, JSON.stringify(response));
      await redisClient.disconnect();

      return NextResponse.json({ response: response, success: true });
    })
    .catch((e) => {
      console.log(e);
      return NextResponse.json({ error: e, success: false });
    });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (sessionId === undefined || sessionId === null) {
    return NextResponse.json(
      {
        message: "sessionId is undefined",
      },
      {
        status: 404,
      }
    );
  }

  await redisClient.connect();
  let cacheResponse = await redisClient.get(sessionId);
  await redisClient.disconnect();
  // const cacheResponse = sessionCache.get(sessionId);

  if (cacheResponse === null) {
    return NextResponse.json(
      {
        message: "Could not find Session in Node Cache",
      },
      { status: 404 }
    );
  }

  console.log("Successfully retrieved session from SessionCache");
  console.log(cacheResponse);

  return NextResponse.json(JSON.parse(cacheResponse));
}
