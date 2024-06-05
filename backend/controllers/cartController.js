import userModel from "../models/userModel.js"


/**
 * Adds an item to the user's cart
 *
 * @param {Object} req - The request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.userId - The ID of the user
 * @param {string} req.body.itemId - The ID of the item to add to the cart
 * @param {Object} res - The response object
 * 
 */
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    }
    else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to cart!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

/**
 * Removes an item from the user's cart
 *
 * @param {Object} req - The request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.userId - The ID of the user
 * @param {string} req.body.itemId - The ID of the item to remove from the cart
 * @param {Object} res - The response object
 *
 */
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed from cart!" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

/**
 * Retrieves the cart data for a user
 *
 * @param {Object} req - The request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.userId - The ID of the user
 * @param {Object} res - The response object
 * 
 */
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addToCart, removeFromCart, getCart }