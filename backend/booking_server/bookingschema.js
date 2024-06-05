import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  table: { type: String, required: true },
  seat: { type: String, required: true },
  numberOfPeople: { type: Number, required: true }
});

module.exports = BookingSchema