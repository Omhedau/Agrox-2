const asyncHandler = require("express-async-handler");
const Machine = require("../models/booking");

//@desc Get All bookings
//@route GET /api/booking
//@access Public
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  if (bookings) {
    res.status(200).json({
      message: "Bookings found",
      bookings
    });
  } else {
    res.status(404);
    throw new Error("No bookings found");
  }
});

//@desc Get booking details
//@route GET /api/booking/:id
//@access Public
const getBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findById(bookingId);
  if (booking) {
    res.status(200).json({
      message: "Booking found",
      booking
    });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

//@desc Add a booking
//@route POST /api/booking
//@access Private
const addBooking = asyncHandler(async (req, res) => {
  const { ownerId, machineId, userId } = req.body;
  const booking = new Booking({
    ownerId,
    machineId,
    userId
  });
  const createdBooking = await booking.save();
  res.status(201).json({
    message: "Booking added successfully",
    booking: createdBooking,
  });
});

//@desc Update booking status
//@route PUT /api/booking/:id
//@access Private
const updateBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const status = req.body.status;
  const booking = await Booking.findById(bookingId);
  if (booking) {
    booking.status = status;
    const updatedBooking = await booking.save();
    res.status(200).json({
      message: "Booking status updated",
      booking: updatedBooking
    });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

//@desc Delete a booking
//@route DELETE /api/booking/:id
//@access Private
const deleteBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findById(bookingId);
  if (booking) {
    await booking.remove();
    res.status(200).json({
      message: "Booking deleted"
    });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});


module.exports = { getBookings, getBooking, addBooking, updateBooking, deleteBooking };