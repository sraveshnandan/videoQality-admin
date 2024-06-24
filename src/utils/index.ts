import { ITask } from "@/lib/database/models/task.model";
import { IUser } from "@/lib/database/models/user.model";

// function to send api response
const ApiResponse = (
  NextResponse: any,
  message: string | "Internal Server error",
  success: boolean | false,
  status: number | 500
) => {
  return NextResponse.json({ success: success, message: message }, { status });
};

type NextType = {};

const FetchAllTask = async (nextFun: (params: ITask[]) => void) => {
  const isTaskexist = localStorage.getItem("alltasks");
  if (isTaskexist) {
    nextFun(JSON.parse(isTaskexist));
  } else {
    const at = await fetch("/api/admin/tasks");
    const data = await at.json();
    nextFun(data.tasks);
  }
};

const SetUserProfile = (next: (params: IUser) => void) => {
  console.log("user fn runs");
  const user = localStorage.getItem("user");
  if (user !== null) {
    return next(JSON.parse(user as any));
  }
  return;
};

export { ApiResponse, FetchAllTask, SetUserProfile };
