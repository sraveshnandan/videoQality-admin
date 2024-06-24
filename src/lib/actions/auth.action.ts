
import { UserModel } from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";

const SignIn = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    await connectToDatabase();

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return {
        success: false,
        message: "Invalid Email, No account found.",
      };
    }

    const is_admin = user.user_type === "admin";
    const is_moderator =
      user.user_type === "moderator" && process.env.MODERATOR_KEY;

    if (!is_admin && is_moderator) {
      return {
        success: false,
        message: "Unauthorised, You are not allowed.",
      };
    }
    const isAdminpass_matched = password === process.env.ADMIN_KEY;
    const is_mod_pass_matched = password === process.env.ADMIN_KEY;
    if (!isAdminpass_matched && is_mod_pass_matched) {
      return {
        success: false,
        message: "Invalid email or Password.",
      };
    }
    return {
      success: true,
      message: `Wecome back, Mr. ${user.first_name}`,
      user: JSON.stringify(user),
    };
  } catch (error: any) {
    console.log("error occured in Sign in function", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export { SignIn };
