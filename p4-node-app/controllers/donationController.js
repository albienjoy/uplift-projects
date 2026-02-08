import Donations from "../models/donationModel.js";

const listRecord = async (req, res) => {
  try {
    const records = await Donations.find().populate("donor");

    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const createRecord = async (req, res) => {
  try {
    const newData = req.body;
    const record = new Donations(newData);

    await record.save();

    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
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
  }
};

const updateRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const record = await Donations.findByIdAndUpdate(id, newData);

    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    await Donations.findByIdAndDelete(id);

    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export { listRecord, createRecord, readRecord, updateRecord, deleteRecord };
