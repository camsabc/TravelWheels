const Travel = require('../models/Travel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const updateProfile = async (req, res) => {
  const { id } = req.params; // Get userId from params
  const { firstname, lastname, email, phone, password, confirmPassword } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const user = await Travel.findById(id); // Find user by ID
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.phone = phone || user.phone;
    if (password && password === confirmPassword) {
      user.t_password = await bcrypt.hash(password, saltRounds);
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();
    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { updateProfile };