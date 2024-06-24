import { TaskModel } from "@/lib/database/models/task.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    if (req.method === "GET") {
      await connectToDatabase();
      const tasks = await TaskModel.find({})
        .populate("user moderator")
        .sort({ createdAt: -1 });
      // if there is any tasks exists in database
      if (tasks.length > 0) {
        return NextResponse.json({
          success: true,
          tasks,
          message: "All tasks fetched successfully.",
        });
      }

      return NextResponse.json({ success: true, message: "No tasks yet." });
    }
    
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
