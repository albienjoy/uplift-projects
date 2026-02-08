import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    contactNum: {type: Number},
    },
    {
        timestamps: true
    });

const Users = mongoose.model("user", schema);

export default Users;