import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


/**
 * This function handles the process of placing an order.
 * It creates a new order in the database, updates the user's cart, and creates a Stripe checkout session.
 *
 * @param {Object} req - The request object containing the user's order details.
 * @param {Object} res - The response object used to send a JSON response.
 * @returns {Object} A JSON object indicating the success or failure of the operation.
 */
const placeOrder = async (req, res) => {

  // Set the frontend URL
  const frontend_url = "http://localhost:5173"

  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })

    await newOrder.save();

    // Clear the user's cart after placing an order
    await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData: {} } });

    // Create an array of line items for the checkout session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    // Add an order charge item to the line items
    line_items.push({
      price_data: {
        currency: "zar",
        product_data: {
          name: "Order Charges"
        },
        unit_amount: 300
      },
      quantity: 1
    })

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    // Send a JSON response with the success status and the session URL
    res.json({ success: true, session_url: session.url })

  } catch (error) {
    // Log any errors and send a JSON response with the failure status and an error message
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}


/**
 * Verifies the order by updating the payment status in the database.
 *
 * @param {Object} req - The request object containing the order details.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.success - The success status of the payment.
 * @param {string} req.body.orderId - The ID of the order.
 */
const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Failed" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

/**
 * Retrieves the orders for a specific user from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.userId - The ID of the user.
 * @param {Object} res - The response object to send the result back.
 */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

/**
 * Retrieves all orders from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result back.
 */
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders }