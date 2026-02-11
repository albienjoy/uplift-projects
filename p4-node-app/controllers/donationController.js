import { isObjectIdOrHexString } from "mongoose";
import Donations from "../models/donationModel.js";

const listRecord = async (req, res) => {
  try {
    const records = await Donations.find().populate("donor");

    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  };
};

// const create = async (req, res) => {
//     const {item, type, quantity } = req.body;
//     const photo = [];

//     console.log(req.files);
//     if (!req.files && req.files.length > 0 ){

//         for (const file of req.files){
//             const b64 = Buffer.from(file.buffer).toString("base64");
//             const dataURI = `data:${file.mimetype};base64,${b64}`;

//             const result = await cloudinary.uploader.upload(dataURI, {
//                 folder: "photos",
//                 resource_type: "auto",
//             });

//             photo.push({
//                 url: result.secure_url,
//                 publicId: result.public_id,
//                 format: result.format
//             })
//         };
//     }

//     const donation = await Donations.create({
//         item,
//         type,
//         quantity,
//         photo
//     })
//     res.json({
//         success: true,
//         data: donation,
//     })
// };


//no photo
const createRecord = async (req, res) => {
  try {
    const { item, type, quantity } = req.body;

    const newRecord = new Donations({
      donor: req.session.userId,
      item,
      type,
      quantity,
    });

    await newRecord.save();
    res.status(201).json(newRecord);

  } catch (err) {
    res.json({ error: err.message });
  };
}; 

const readRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Donations.findById(id).populate("donor");

    if (!record) {
      res.json({ error: "Record not found" });
      return;
    }
    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  };
};

const updateRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const record = await Donations.findByIdAndUpdate(id, newData);

    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  };
};

const hardDeleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    await Donations.findByIdAndDelete(id);

    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ error: err.message });
  };
};

const softDeleteRecord = async (req, res) => {

  const _id = req.params.id;
  const softDeletedRecord = await Donations.findById(_id).updateOne(
    { $set: { deletedAt: new Date() } },
  );

    res.status(201).json({status: "Success",
      message: "Entry moved to trash"
    });
};


export { listRecord, createRecord, readRecord, updateRecord, hardDeleteRecord, softDeleteRecord };