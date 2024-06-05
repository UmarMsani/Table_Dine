import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import contactRouter from "./routes/contactRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use('/api/contact', contactRouter)
app.use('/api/bookings', bookingRouter)



app.get("/", (req, res) => {
  const message = `
    <html>
      <head>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h3>Welcome to  </h3>
        <h1><strong>Table Dine's API</strong></h1>
        <p><strong>  The database is connected successfully</strong></p>
        <p><strong id="time">Current Time: ${new Date().toLocaleString()}</strong></p>
      </body>
      <script>
        const timeElement = document.getElementById("time");
        function updateTime() {
          timeElement.textContent = "Current Time: " + new Date().toLocaleString();
        }
        setInterval(updateTime, 1000);
        updateTime();
      </script>
    </html>
  `;
  res.send(message);
});

app.listen(port, () => {
  console.log("%c🖥Server started on http://localhost:%c" + port + "%c🖥", "color: green;", "color: black;", "color: green;");
})
