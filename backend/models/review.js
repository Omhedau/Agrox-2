const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    machineId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Machine', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', required: true },
    rating: { type: Number, required: true },
    review: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Review', ReviewSchema);
  