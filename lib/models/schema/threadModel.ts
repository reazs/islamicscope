import mongoose, { Schema, model, models, Document } from "mongoose";
import { CommentDocument, commentSchema } from "./commentModel";

// Define the Thread (Post) schema
const threadSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [commentSchema],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of users who liked the post
  createdAt: { type: Date, default: Date.now },
});

// Define the TypeScript interface for the Thread model
export interface ThreadDocument extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  comments: CommentDocument[];
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

// Function to get or create the Thread model
const getThreadModel = (): mongoose.Model<ThreadDocument> => {
  try {
    return models.Thread || model<ThreadDocument>("Thread", threadSchema);
  } catch (error) {
    console.error("Error creating Thread model:", error);
    return model<ThreadDocument>("Thread", threadSchema);
  }
};

// Create the Thread model
const ThreadModel: mongoose.Model<ThreadDocument> = getThreadModel();

export default ThreadModel;
