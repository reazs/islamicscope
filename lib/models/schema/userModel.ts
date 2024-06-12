import mongoose, { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for the User model
export interface UserDocument extends Document {
  username: string;
  email: string;
  imageUrl: string;
  onboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    onboarding: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Function to get or create the User model
const getUserModel = (): mongoose.Model<UserDocument> => {
  try {
    return models.User || model<UserDocument>("User", userSchema);
  } catch (error) {
    console.error("Error creating User model:", error);
    return model<UserDocument>("User", userSchema);
  }
};

// Create the User model
const UserModel: mongoose.Model<UserDocument> = getUserModel();

export default UserModel;
