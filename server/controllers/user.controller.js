import User from "../models/user.model.js";

/**
 * Update user profile
 * @function
 * @name updateProfile
 * @memberof module:controllers/user.controller
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while updating the user
 */
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(req.body);
    // return updated user data along with message
    res.json({ message: "profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
