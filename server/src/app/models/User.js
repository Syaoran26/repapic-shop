import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpVerify: {
      otp: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
      expiredAt: {
        type: Date,
      },
    },
    dOB: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    providerId: String,
    address: {
      city: String,
      district: String,
      ward: String,
      detail: String,
      street: String,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'banned'],
      default: 'pending',
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    refreshToken: String,
  },
  { timestamps: true },
);

User.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

User.pre('findOneAndUpdate', async function (next) {
  const password = this.getUpdate().$set.password;
  if (!password) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.getUpdate().$set.password = await bcrypt.hash(password, salt);
});

User.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model('User', User);
