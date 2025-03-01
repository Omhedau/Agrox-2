const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', required: true },
    bookingIds: { type: [mongoose.Schema.Types.ObjectId],
      ref: 'Booking' },
    reviewId: { type: [mongoose.Schema.Types.ObjectId], 
      ref: 'Review'  },
    name: { type: String, required: true },
    model: { type: String },
    description: { type: String },
    yearOfMfg: { type: Number, required: true },
    rentalStart: { type: String },
    rentalEnd: { type: String },
    operatingArea: { type: mongoose.Schema.Types.Mixed },
    rentalCost: { type: mongoose.Types.Decimal128, required: true },
    rentalUnit: { type: String, enum: ['hour', 'day', 'week', 'month', 'hect'], required: true },
    images: { type: [String] },
    documents: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Machine', MachineSchema);
  