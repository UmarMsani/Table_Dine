import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://linford:AdminNimdA@cluster0.kxs5rub.mongodb.net/table-dine').then(()=>console.log("Database Connected✅"));
}