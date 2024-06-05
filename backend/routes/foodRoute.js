import express from "express"
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();


const storage = multer.diskStorage({
  destination: "uploads",
  /**
   * Callback function for generating the filename for the uploaded file.
   * It generates a unique filename by appending the current timestamp to the original filename.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - The callback function to be called with the generated filename.
   * @returns {void}
   */
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalFilename = file.originalname;
    const generatedFilename = `${timestamp}${originalFilename}`;

    return cb(null, generatedFilename);
  }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", updateFood);





export default foodRouter;