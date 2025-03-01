const mongoose = require("mongoose");

// Taluka Schema
const TalukaSchema = new mongoose.Schema({
  taluka_name: { type: String, required: true },
  district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Taluka', TalukaSchema);