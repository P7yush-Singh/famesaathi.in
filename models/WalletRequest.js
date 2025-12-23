import mongoose from "mongoose";

const WalletRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    utr: {
      type: String,
      required: true,
      unique: true,
    },
    screenshot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: String,
  },
  { timestamps: true }
);

export default mongoose.models.WalletRequest ||
  mongoose.model("WalletRequest", WalletRequestSchema);
