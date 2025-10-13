import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true } // for Google login users
});

userSchema.plugin(passportLocalMongoose, { usernameUnique: false });
userSchema.plugin(findOrCreate);

export const User = mongoose.model("User", userSchema);
