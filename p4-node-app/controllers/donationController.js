import Donations from "../models/donationModel.js";

const listRecord = async (req, res) => {
  try {
    const records = await Donations.find().populate("donor");

    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  };
};

//MUST TEST
const createRecord = async (req, res) => {
  try {
    const { item, type, quantity } = req.body;
    const newRecord = new Donations({
      donor: req.session.userId,
      item,
      type,
      quantity
    });

    const files = [];

    if (!req.files && req.files.length > 0) {
      for (const file of req.files){
        const b64 = Buffer.from(file.buffer).toString("base64");

        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "donations",
          resource_type: "auto",
        });

        files.push({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format
        });
      };
    };

    newRecord.photo = files;

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

const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    await Donations.findByIdAndDelete(id);

    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ error: err.message });
  };
};

export { listRecord, createRecord, readRecord, updateRecord, deleteRecord };