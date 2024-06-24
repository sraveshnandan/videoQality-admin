import { TaskModel } from "../database/models/task.model";
import { connectToDatabase } from "../database/mongoose";

const GetAllTasks = async () => {
  try {
    const res = await connectToDatabase();

    const allTasks = await TaskModel.find({})
      .sort({ createdAt: -1 })
      .populate("user moderator");
    console.log("allt", allTasks);
    return JSON.stringify(allTasks); 
  } catch (error: any) {
    console.log("error occured while fetching all tasks.", error);
  }
};

export { GetAllTasks };
