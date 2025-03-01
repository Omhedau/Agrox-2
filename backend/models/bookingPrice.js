const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking', required: true },
    rent: { type: mongoose.Types.Decimal128, required: true },
    platformFee: { type: mongoose.Types.Decimal128 },
    discount: { type: mongoose.Types.Decimal128 },
    status: { type: String, enum: ['Approx', 'Confirmed'], required: true },
    createdAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Price', PriceSchema);
  