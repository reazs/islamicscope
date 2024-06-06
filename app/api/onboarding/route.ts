import { NextResponse } from "next/server";
import connectDB from "@/lib/utils/database";
import UserModel from "@/lib/models/schema/userModel";

export const POST = async (req: Request) => {
  await connectDB();
  try {
    const body = await req.json();
    const user = new UserModel(body);
    const savedUser = user.save();

    return NextResponse.json({ savedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create user profile" },
      { status: 500 }
    );
  }
};
