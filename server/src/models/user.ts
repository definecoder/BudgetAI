import mongoose from "mongoose";

// write user schema here
export const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: String,
  avatar: String,
  dailyGoal: Number,
  monthlyGoal: Number,
  yearlyGoal: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
