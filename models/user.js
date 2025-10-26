import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import { secretSchema } from "./secret.js";

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true }, // for Google login users
    facebookId: { type: String, unique: true, sparse: true }, // for Facebook login users
    secrets: [secretSchema]
});

userSchema.plugin(passportLocalMongoose, { usernameUnique: false });
userSchema.plugin(findOrCreate);

export const User = mongoose.model("User", userSchema);