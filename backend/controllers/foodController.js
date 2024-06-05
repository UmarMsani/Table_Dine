import foodModel from "../models/FoodModel.js";
import fs from 'fs'


// add food items

/**
 * Adds a new food item to the database.
 *
 * @param {Object} req - The request object containing the food item details.
 * @param {Object} res - The response object to send the result back.
 * 
 */
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  })
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

/**
 * Retrieves all food items from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result back.
 * @return {Object} An object with success status and data.
 */
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      data: foods
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    });
  }
}

/**
 * Removes a food item from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.id - The ID of the food item to remove.
 * @param {Object} res - The response object to send the result back.
 *
 */
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => { });

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// update food item
const updateFood = async (req, res) => {
  const { id, name, category, price, image } = req.body;

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    food.name = name;
    food.category = category;
    food.price = price;
    food.image = image;

    await food.save();
    res.json({ success: true, message: 'Food item updated successfully', data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating food item' });
  }
};


export { addFood, listFood, removeFood, updateFood }