import { NextResponse } from "next/server";

const handler = () => {
  return NextResponse.json(
    { message: "Everything is working fine." },
    { status: 200 }
  );
};

export { handler as GET };
