const mongoose = require('mongoose');

const RentalMeasureSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalUnits: { type: Number, required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking', required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('RentalMeasure', RentalMeasureSchema);
  