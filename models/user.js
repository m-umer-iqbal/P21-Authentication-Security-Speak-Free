import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


userSchema.plugin(encrypt, { secret: process.env.SECRET_MESSAGE, encryptedFields: ["password"] });

export const User = mongoose.model("User", userSchema);