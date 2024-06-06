"use server";
import PostModel from "../models/schema/postModel";
import connectDB from "../utils/database";

export async function getPosts() {
  try {
    await connectDB();
    const posts = await PostModel.find();

    return { msg: "GET", post: posts };
  } catch (error) {
    console.log(error);
  }
}

