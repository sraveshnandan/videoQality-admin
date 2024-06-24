import { UserModel } from "@/lib/database/models/user.model";
import { NextResponse } from "next/server";

const handler = async () => {
  try {
    const users = await UserModel.find({});
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export { handler as GET };
