import { sendPushNotification } from "@/lib/firebase";
import { ApiResponse } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    if (req.method === "GET") {
      const deviceTokens = [
        "dF_GFdOLdwmNxHWM_oQL0j:APA91bF4V61hLee6Ecg0j2l3EuMigPT3aQt_PT_K_LaU_h2Q7q4Dt4VEqXMFadV67-JC-Fs53wxK9Rs1-s76AdHULr4IAFRVFSZxT9BLM9cAb5lOoNorOrb1JCITq3ZCw05BOT7Oq7Dt",
        "e36J4XEokrfREYyzo7_zWX:APA91bHIvVltYZRSeUQdH_4m9hnWr_Yfw1eccHBdRh_S7attKRrBikEfCxDYj6XNFDNLQqdwef6Uo_5qe440N71f8PV-BQP0cwT6NHNTwLy6BQRI0SO9AeKkuRS22PeBTUazFQuhemUj",
      ]; // Replace with the actual device token
      const title = "Hello EveryOne";
      const body = "This is a test notification";

      const res = await sendPushNotification(deviceTokens, title, body);
      console.log(res);
      return ApiResponse(
        NextResponse,
        "Welcome to firebase messaging Api.",
        true,
        200
      );
    }

    // handling post request

    if (req.method === "POST") {
      const data = (await req.json()) as {
        deviceTokens: string[];
        title: string;
        body: string;
      };
      const deviceTokens = data.deviceTokens;

      const title = data.title;
      const body = data.body;

      const msgres = await sendPushNotification(deviceTokens, title, body);

      console.log("notification res", msgres);
      return ApiResponse(NextResponse, "Message sent.", true, 200);
    }
  } catch (error: any) {
    console.error("error occured in firebase messaging api.", error);
    return ApiResponse(NextResponse, error.message, false, 500);
  }
};

export { handler as GET, handler as POST };
