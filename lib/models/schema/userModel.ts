import mongoose, { Schema, model, Document, models } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  imageUrl: string;
  onboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },

    onboarding: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = models.User || model<UserDocument>("User", userSchema);

export default UserModel;
