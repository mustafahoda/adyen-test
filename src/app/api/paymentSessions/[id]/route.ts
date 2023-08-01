import { NextRequest } from "next/server";

type Params = {
  sessionId: string;
};

export async function GET(request: NextRequest, params: Params) {
  console.log("----Incoming Request------");
  const { sessionId } = params;

  console.log("Okay go get session");
  console.log(sessionId);
}
