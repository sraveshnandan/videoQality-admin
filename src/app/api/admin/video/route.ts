import { cloudinary } from "@/lib/cloudinary";
import { TaskModel } from "@/lib/database/models/task.model";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    if (req.method === "POST") {
      const data = await req.formData();
      const video = data.get("video") as File;
      const taskId = data.get("taskId") as string;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return NextResponse.json({
          success: false,
          messag: "Invalid Id, No taks found.",
        });
      }

      const bufer = await video.arrayBuffer();
      const chunks = new Uint8Array(bufer);

      const uploadRes: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "VideoQuality",
          },
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
        uploadStream.end(chunks);
      });
      task.finalVideo = uploadRes.secure_url;
      task.status = "completed";
      await task.save();

      // notification system integration

      return NextResponse.json({
        success: true,
        response: uploadRes,
        message: "Task submitted successfully.",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Methods not allowed.",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};

export { handler as POST, handler as GET };
