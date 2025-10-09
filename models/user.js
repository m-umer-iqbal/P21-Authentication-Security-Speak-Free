import mongoose from "mongoose";
import encrypt from "mongoose-encryption"; // Correct import

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

const secretMessage = "Thisisourlittlesecret";
userSchema.plugin(encrypt, { secret: secretMessage, encryptedFields: ["password"] });

export const User = mongoose.model("User", userSchema);