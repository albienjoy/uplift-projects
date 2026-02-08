import Addresses from "../models/addressModel.js";

const listRecord = async (req, res) => {
  try {
    const records = await Addresses.find();

    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const createRecord = async (req, res) => {
  try {
    const newData = req.body;
    const record = new Addresses(newData);

    await record.save();

    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const readRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Addresses.findById(id);

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

    const record = await Addresses.findByIdAndUpdate(id, newData);

    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    await Addresses.findByIdAndDelete(id);

    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export { listRecord, createRecord, readRecord, updateRecord, deleteRecord };
