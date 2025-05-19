import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\+?\d{9,15}$/, // ejemplo para validación de número
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // ejemplo para validación de email
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dqj8v3x2f/image/upload/v1698231234/avatars/default-avatar.png",
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ⏱️ crea createdAt y updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;
