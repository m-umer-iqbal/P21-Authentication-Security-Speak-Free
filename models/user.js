import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    // you can add fields like email later if you want
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);
