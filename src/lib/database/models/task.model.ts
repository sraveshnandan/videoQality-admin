import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

// Task interface
export interface ITask extends Document {
  rawVideo: string;
  finalVideo: string;
  prompt: string;
  status: string;
  moderator: IUser;
  editing_type: string;
  user: IUser;
}

const TaskSchema = new Schema<ITask>(
  {
    rawVideo: { type: String, required: true },
    finalVideo: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["processing", "completed", "queued"],
    },
    prompt: { type: String, required: true },
    moderator: { type: Schema.Types.ObjectId, ref: "User" },
    editing_type: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const TaskModel = models.Task || model<ITask>("Task", TaskSchema);

export { TaskModel };
