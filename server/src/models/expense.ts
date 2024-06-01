import mongoose from "mongoose";

// write user schema here
const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expenses", expenseSchema);
