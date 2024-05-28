import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// User login
const loginUser = async (req, res) => {

}

// User sign up
const registerUser = async (req, res) => {
  const {name, password, email} = req.body;
  try {
    const exists = await userModel.findOne({email})
    if (exists) {
      return res.json({success:false, message:"Email already registered!"})
    }

    if (!validator.isEmail(email)) {
      return res.json({success:false, message:"Invalid email address!"})
    }

    if (password.length < 8) {
      return res.json({success:false, message:"Please enter a strong password!"})
    }

    const salt = await bcrypt.genSalt(10)
  } catch (error) {
    
  }

}

export {loginUser, registerUser}