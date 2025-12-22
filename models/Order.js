import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    category: String,
    serviceId: String,
    serviceName: String,

    link: String,
    quantity: Number,

    pricePer1000: Number,
    totalAmount: Number,

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },

    adminNote: String
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
