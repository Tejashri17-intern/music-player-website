// import dotenv from "dotenv";
// dotenv.config();

// import imagekit from "../config/imagekit.js";
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import sendEMail from "../utils/sendEMail.js";

// /* ================= TOKEN CREATION ================= */
// const createToken = (userId) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );
// };

// /* ================= SIGNUP ================= */
// const signup = async (req, res) => {
//   try {
//     const { name, email, password, avatar } = req.body;

//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name, emailID and password are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "emailID already exists" });
//     }

//     let avatarUrl = "";

//     if (avatar) {
//       const uploadResponse = await imagekit.upload({
//         file: avatar,
//         fileName: `avatar_${Date.now()}.jpg`,
//         folder: "/mern-music_player",
//       });

//       avatarUrl = uploadResponse.url;
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       avatar: avatarUrl,
//     });

//     const token = createToken(user._id);

//     return res.status(201).json({
//       message: "User created successfully",
//       user,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Signup Error" });
//   }
// };

// /* ================= LOGIN ================= */
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = createToken(user._id);

//     res.status(200).json({ message: "Login successful", user, token });
//   } catch {
//     res.status(500).json({ message: "Login Error" });
//   }
// };

// /* ================= GET ME ================= */
// const getMe = async (req, res) => {
//   res.status(200).json({ message: "You got me" });
// };

// /* ================= FORGOT PASSWORD ================= */
// const forgotPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     await sendEMail({
//       to: user.email,
//       subject: "Reset your password",
//       html: `<a href="${resetUrl}">${resetUrl}</a>`,
//     });

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch {
//     res.status(500).json({ message: "Forgot password error" });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// const resetPassword = async (req, res) => {
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordTokenExpires: { $gt: Date.now() },
//   });

//   if (!user)
//     return res.status(400).json({ message: "Token invalid or expired" });

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordTokenExpires = undefined;

//   await user.save();
//   res.status(200).json({ message: "Password updated successfully" });
// };

// /* ================= EDIT PROFILE ================= */
// const editProfile = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const { name, email, avatar, currentPassword, newPassword } = req.body;

//     const user = await User.findById(userId);

//     if (name) user.name = name;
//     if (email) user.email = email;

//     if (currentPassword || newPassword) {
//       if (!currentPassword || !newPassword) {
//         return res.status(400).json({
//           message: "Both current and new password are required",
//         });
//       }

//       const isMatch = await user.comparePassword(currentPassword);
//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ message: "Current password is incorrect" });
//       }

//       if (newPassword.length < 6) {
//         return res.status(400).json({
//           message: "Password must be at least six characters",
//         });
//       }

//       user.password = newPassword;
//     }

//     if (avatar) {
//       const uploadResponse = await imagekit.upload({
//         file: avatar,
//         fileName: `avatar_${userId}_${Date.now()}.jpg`,
//         folder: "/mern-music-player",
//       });

//       user.avatar = uploadResponse.url;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("edit profile error", error.message);
//     res.status(500).json({ message: "Edit profile error" });
//   }
// };

// export {
//   signup,
//   login,
//   getMe,
//   forgotPassword,
//   resetPassword,
//   editProfile,
// };

import dotenv from "dotenv";
dotenv.config();

import imagekit from "../config/imagekit.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEMail from "../utils/sendEMail.js";

/* ================= TOKEN CREATION ================= */
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/* ================= SIGNUP ================= */
const signup = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, emailID and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "emailID already exists" });
    }

    let avatarUrl = "";

    if (avatar) {
      const uploadResponse = await imagekit.upload({
        file: avatar,
        fileName: `avatar_${Date.now()}.jpg`,
        folder: "/mern-music_player",
      });

      avatarUrl = uploadResponse.url;
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: avatarUrl,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Error" });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.status(200).json({ message: "Login successful", user, token });
  } catch {
    res.status(500).json({ message: "Login Error" });
  }
};

/* ================= GET ME ================= */
const getMe = async (req, res) => {
  res.status(200).json({ message: "You got me" });
};

/* ================= FORGOT PASSWORD ================= */
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEMail({
      to: user.email,
      subject: "Reset your password",
      html: `<a href="${resetUrl}">${resetUrl}</a>`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch {
    res.status(500).json({ message: "Forgot password error" });
  }
};

/* ================= RESET PASSWORD ================= */
const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Token invalid or expired" });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

/* ================= EDIT PROFILE ================= */
const editProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { name, email, avatar, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (name) user.name = name;
    if (email) user.email = email;

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Both current and new password are required",
        });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          message: "Password must be at least six characters",
        });
      }

      user.password = newPassword;
    }

    if (avatar) {
      const uploadResponse = await imagekit.upload({
        file: avatar,
        fileName: `avatar_${userId}_${Date.now()}.jpg`,
        folder: "/mern-music-player",
      });

      user.avatar = uploadResponse.url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("edit profile error", error.message);
    res.status(500).json({ message: "Edit profile error" });
  }
};

/* ================= GET FAVOURITES ================= */
const getFavourites = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(userId).select("favourites");
    res.status(200).json(user.favourites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favourites" });
  }
};

/* ================= TOGGLE FAVOURITE ================= */
const toggleFavourite = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const song = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if song already exists in favourites
    const isExist = user.favourites.find((item) => item.id === song.id.toString());

    if (isExist) {
      // Remove if exists
      user.favourites = user.favourites.filter((item) => item.id !== song.id.toString());
    } else {
      // Add if new
      user.favourites.push({
        id: song.id.toString(),
        name: song.name,
        artist_name: song.artist_name,
        image: song.cover || song.image,
        duration: song.duration,
        audio: song.url || song.audio
      });
    }

    await user.save();
    res.status(200).json(user.favourites);
  } catch (error) {
    console.error("Toggle Favourite Error:", error.message);
    res.status(500).json({ message: "Server error while updating wishlist" });
  }
};

export {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  editProfile,
  getFavourites,
  toggleFavourite,
};