const mongoose = require("mongoose");

// District Schema
const DistrictSchema = new mongoose.Schema({
  district_name: { type: String, required: true },
  state: { type: String, default: "Maharashtra" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("District", DistrictSchema);
