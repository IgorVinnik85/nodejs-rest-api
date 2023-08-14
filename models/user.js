import { Schema, model } from "mongoose";

import handleSaveError from "./hooks.js";

import Joi from "joi";


const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});


export default {
  User,
  userSignupSchema,
  userSigninSchema,
};