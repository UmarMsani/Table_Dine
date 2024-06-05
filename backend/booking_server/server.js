import Booking from '../Booking/Booking';
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bookingschema from "bookingschema";
import cors from "cors";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json()); 


const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  table: { type: String, required: true },
  seat: { type: String, required: true },
  numberOfPeople: { type: Number, required: true }
});


// API endpoint to check availability
app.get('/api/checkTableAvailability', async (req, res) => {
        const { table, seat, numberOfPeople } = req.query;

  try {
    // Check for existing booking on selected date, table, and seat
    const existingBooking = await Booking.findOne({
      date: new Date(req.query.date),
      table,
      seat
    });

    if (existingBooking) {
      return res.status(200).json({ isAvailable: false });
    }

    // No existing booking, table is available
    res.status(200).json({ isAvailable: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking availability' });
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
