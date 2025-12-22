import mongoose from "mongoose";

const walletRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 10,
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
  mongoose.model("WalletRequest", walletRequestSchema);
