import mongoose from "mongoose";

const schema = new mongoose.Schema({
    donor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    item: {type: String, required: true},
    type: {type: String, required: true},
    quantity: {type: Number, required: true},
    photo: [{
        url: String,
        publicId: String,
        format: String,
    }]
    },
    {
        timestamps: true
    });

const Donation = mongoose.model("donation", schema);

export default Donation;