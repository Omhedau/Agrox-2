const mongoose = require("mongoose");

const VillageSchema = new mongoose.Schema(
  {
    village_name: { type: String, required: true },
    taluka_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Taluka",
      required: true,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    pincode: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Village", VillageSchema);
