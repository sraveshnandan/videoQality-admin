import { ITask } from "@/lib/database/models/task.model";
import { IUser } from "@/lib/database/models/user.model";

// admin device token

const deviceTokens = [
  "dF_GFdOLdwmNxHWM_oQL0j:APA91bF4V61hLee6Ecg0j2l3EuMigPT3aQt_PT_K_LaU_h2Q7q4Dt4VEqXMFadV67-JC-Fs53wxK9Rs1-s76AdHULr4IAFRVFSZxT9BLM9cAb5lOoNorOrb1JCITq3ZCw05BOT7Oq7Dt",
  "e36J4XEokrfREYyzo7_zWX:APA91bHIvVltYZRSeUQdH_4m9hnWr_Yfw1eccHBdRh_S7attKRrBikEfCxDYj6XNFDNLQqdwef6Uo_5qe440N71f8PV-BQP0cwT6NHNTwLy6BQRI0SO9AeKkuRS22PeBTUazFQuhemUj",
  "c44-OlvjNauFojmh7uTKV6:APA91bHk9O6bHIkIF5Wzb0zWSCF-mvq89q3i8MHReHE-oNEeRpfFfoMMXLTvnrPScw3Fs4UOH2gXyVt97_0uRD7UPtEUA8EwjKqFE9MDf-vW9oTshGIXuWwPEPzxUWccgr3-nDfNOxLP",
]; // Replace with the actual device token
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

export { ApiResponse, FetchAllTask, SetUserProfile, deviceTokens };
