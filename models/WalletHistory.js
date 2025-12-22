import mongoose from "mongoose";

const walletHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: Number,
    source: String,
  },
  { timestamps: true }
);

export default mongoose.models.WalletHistory ||
  mongoose.model("WalletHistory", walletHistorySchema);
