const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', required: true },
    machineId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Machine' , required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' , required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled'], required: true },
    priceId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Price' },
    remarks: { type: String },
    rentalMeasureId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'RentalMeasure'  },
    reviewId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Review'  },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Booking', BookingSchema);
  