import { NextResponse } from "next/server";
import connectDB from "@/lib/utils/database";
import UserModel from "@/lib/models/schema/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export const POST = async (req: Request, res: NextApiResponse) => {
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
    return NextResponse.json(
      { error: "Failed to create user profile" },
      { status: 500 }
    );
  }
};
