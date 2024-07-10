import UserModel from "@/lib/models/schema/userModel";
import connectDB from "@/lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const body = await req.json();
    const { hadithId, userEmail } = body;

    const userProfile = await UserModel.findOne({ email: userEmail });
    if (!userProfile) {
      return NextResponse.json(
        { message: "Failed to find user profile!" },
        { status: 404 }
      );
    }

    if (!userProfile.hadiths) {
      userProfile.hadiths = [];
    }

    const hadithIndex = userProfile.hadiths.findIndex(
      (hId) => hadithId === hId
    );

    if (hadithIndex > -1) {
      // Remove the hadithId if it exists
      userProfile.hadiths.splice(hadithIndex, 1);
    } else {
      // Add the hadithId if it does not exist
      userProfile.hadiths.push(hadithId);
    }

    await userProfile.save();

    return NextResponse.json(
      { message: "Hadith saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to add save hadith:", error);
    return NextResponse.json(
      {
        message: "Failed to add save hadith",
      },
      { status: 500 }
    );
  }
};
export interface ISaveHadith {
  hadithId: number;
  userEmail: string;
}
export const saveHadith = async ({ hadithId, userEmail }: ISaveHadith) => {
  try {
    const response = await fetch("/api/user/hadith", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hadithId: hadithId,
        userEmail: userEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save hadith ID");
    }

    const data = await response.json();
    console.log("Successfully saved hadith by ID:", data);
    return data;
  } catch (error) {
    console.log("Failed to save hadith ID", error);
    throw new Error("Failed to save hadith ID");
  }
};
