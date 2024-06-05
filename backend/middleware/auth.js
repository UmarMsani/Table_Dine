import jwt from "jsonwebtoken"

/**
 * Middleware to authenticate requests by verifying JWT tokens.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return - Resolves if the request is authorized, otherwise rejects with an error message.
 */
const authMiddleware = async (req, res, next) => {

  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

export default authMiddleware;