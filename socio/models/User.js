/* This code is defining a Mongoose schema for a user in a MongoDB database. */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 4,
            max: 30,
        },
        lastName: {
            type: String,
            required: true,
            min: 4,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        picturePath: {
            type: String,
            default: '',
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String, // Fixed the typo here
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true } // Fixed the typo here
);

const User = mongoose.model("User", UserSchema);
export default User;
