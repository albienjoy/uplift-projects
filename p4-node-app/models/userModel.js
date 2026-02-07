import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    contactNum: {type: Number},
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }]
    },
    {
        timestamps: true
    });

const User = mongoose.model("user", schema);

export default User;