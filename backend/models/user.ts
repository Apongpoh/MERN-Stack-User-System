import mongoose from 'mongoose';

// Schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 5,
      require: true,
      maxlength: 32,
      unique: true
    },

    hashed_password: {
      type: String,
      require: true,
      trim: true,
      minLength: 8,
      unique: true
    },

    pin: {
      type: String,
      require: true,
      trim: true,
      minLength: 6,
      unique: true
    },

    salt: String,

    about: {
      type: String,
      trim: true
    },

    history: {
      type: Array,
      default: []
    },

    role: {
      type: Number,
      default: 0
    }
  },
  { collection: 'trader', timestamps: true }
);

export default mongoose.model('User', userSchema);