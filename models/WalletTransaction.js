import mongoose from "mongoose";

const WalletTransactionSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    source: {
      type: String,
      enum: ["order", "recharge", "refund"],
      required: true,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    utr: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "completed",
    },

    adminNote: String,
  },
  { timestamps: true }
);

export default mongoose.models.WalletTransaction ||
  mongoose.model("WalletTransaction", WalletTransactionSchema);
