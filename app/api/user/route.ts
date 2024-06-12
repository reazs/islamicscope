import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/utils/database";
import UserModel from "@/lib/models/schema/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { IUser } from "@/types";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const email = body.email;

  await connectDB();

  try {
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to find user" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDB();

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch user info
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const userProfile = await UserModel.findOne({ email: userEmail }).exec();

    if (!userProfile) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ userProfile }, { status: 200 });
  } catch (e) {
    console.error("Error fetching user profile:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const PUT = async (req: NextRequest, res: NextResponse) => {
  await connectDB();
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch user info
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const userProfile = await UserModel.findOne({ email: userEmail });
    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    userProfile.imageUrl = user.imageUrl;
    userProfile.email = user.primaryEmailAddress.emailAddress;
    const savedUserProfile = await userProfile.save();
    return savedUserProfile;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export default async function handler(req: NextRequest, res: NextResponse) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    case "POST":
      return POST(req, res);
    case "PUT":
      return PUT(req, res);
    default:
      return NextResponse.json({ status: 405 }); // Method Not Allowed
  }
}

export const getCurrentUserProfile = async (): Promise<IUser> => {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data.userProfile; // Ensure it returns the correct field
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user profile");
  }
};

export const getUpdatedUserProfileImage = async () => {
  try {
    const response = await fetch("/api/user", {
      method: "PUT", // Use PUT for updates
      headers: {
        "Content-Type": "application/json", // Ensure correct capitalization
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile image");
    }

    const data = await response.json();
    return data.userProfile; // Ensure correct field is returned
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw new Error("Failed to update Profile Image Url");
  }
};
