import { TaskModel } from "@/lib/database/models/task.model";
import { UserModel } from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { sendPushNotification } from "@/lib/firebase";
import { deviceTokens } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const userss = await UserModel.find({});
    if (req.method === "GET") {
      const tasks = await TaskModel.find({})
        .sort({ createdAt: -1 })
        .populate("user moderator");
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

    if (req.method === "POST") {
      const { user, taskId } = await req.json();
      const Currenttask = await TaskModel.findById(taskId).populate("user");
      if (!Currenttask) {
        return NextResponse.json({
          success: false,
          message: "Invalid Task Id.",
        });
      }

      const title = `New task Processed.`;
      const body = `Moderator ${user.first_name} start processing video editing request by ${Currenttask.user.first_name}`;

      await sendPushNotification(deviceTokens, title, body);

      Currenttask.moderator = user._id;
      Currenttask.status = "processing";
      await Currenttask.save();
      return NextResponse.json({
        success: true,
        message: "Task status updated successfully.",
      });
    }

    if (req.method === "PUT") {
      const { taskId, videoUrl } = await req.json();
      console.log("body payload", { taskId, videoUrl });

      const currentTask = await TaskModel.findById(taskId).populate(
        "user moderator"
      );
      if (!currentTask) {
        return NextResponse.json({
          success: false,
          message: "Invalid Task Id.",
        });
      }
      currentTask.status = "completed";
      currentTask.finalVideo = videoUrl;
      await currentTask.save();

      // in future notification or email sending feture

      const title = `Task Submitted Successfully.`;
      const body = `Moderator ${
        currentTask.moderator.first_name
      } successfully completed video editing task request generated by ${
        currentTask.user.first_name
      } at ${currentTask.createdAt.split("T")[0]}`;

      await sendPushNotification(deviceTokens, title, body);

      return NextResponse.json({
        success: true,
        message: "Task Submitted successfully.",
      });
    }
  } catch (error: any) {
    console.log("error in get task fapi route", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
