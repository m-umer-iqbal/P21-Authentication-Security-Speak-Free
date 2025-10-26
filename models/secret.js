import mongoose from "mongoose";

export const secretSchema = new mongoose.Schema({
    secretContent: String
});

export const Secret = mongoose.model("Secret", secretSchema);
