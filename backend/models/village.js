const mongoose = require("mongoose");

const VillageSchema = new mongoose.Schema(
  {
    village_name: { type: String, required: true },
    village_code : { type: String, required: true },
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
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Village", VillageSchema);
