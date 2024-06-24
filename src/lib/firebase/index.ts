import * as admin from "firebase-admin";

// Path to your service account key JSON file
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Function to send a push notification
const sendPushNotification = async (
  deviceTokens: string[],
  title: string,
  body: string
) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: deviceTokens,
  };
  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    return { success: true, response };
  } catch (error: any) {
    console.log("error in not fn", error);
    return {
      success: false,
      message: "Unable to send push notification.",
    };
  }
};

export { sendPushNotification };
