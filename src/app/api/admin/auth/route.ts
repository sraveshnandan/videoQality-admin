import { UserModel } from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method === "POST") {
      const { email, password } = await req.json();

      await connectToDatabase();

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: "No admin account found.",
          },
          { status: 404 }
        );
      }

      const is_admin = user.user_type === "admin";
      const is_moderator =
        user.user_type === "moderator" && process.env.MODERATOR_KEY;

      if (!is_admin && is_moderator) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password." },
          { status: 404 }
        );
      }
      const isAdminpass_matched = password === process.env.ADMIN_KEY;
      const is_mod_pass_matched = password === process.env.ADMIN_KEY;
      if (!isAdminpass_matched && is_mod_pass_matched) {
      }
      return NextResponse.json(
        {
          success: true,
          message: `Wecome back, Mr. ${user.first_name}`,
          user,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Method is not allowed.",
        },
        { status: 405 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server error",
      },
      { status: 500 }
    );
  }
};

export { handler as POST, handler as GET };
