const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    lang: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    role: { type: String, enum: ["Farmer", "Owner", "Admin"], default: "Farmer" },
    profile: { type: String },
    isVerified: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
      required: true,
    }, // Only village reference
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);