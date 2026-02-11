import Donations from "../models/donationModel.js";

const listRecord = async (req, res) => {
  try {
    const records = await Donations.find().populate("donor");

    if (!records) {
      res.status(404).json({ error: "Record not found" });
      return;
    };

    res.json(records);

  } catch (err) {
    res.json({ status: 400,error: err.message });
  };
};

const createRecord = async (req, res) => {
  try {
    const { item, type, quantity } = req.body;

    const newRecord = new Donations({
      donor: req.session.userId,
      item,
      type,
      quantity,
    });

    if (!newRecord) {
      res.status(404).json({ error: "Record not found" });
      return;
    };

    await newRecord.save();
    res.status(201).json(newRecord);

  } catch (err) {
    res.json({ status: 400, error: err.message });
  };
}; 

const readRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Donations.findById(id).populate("donor");

    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }
    res.json(record);
  } catch (err) {
    res.json({ status: 400, error: err.message });
  };
};

const updateRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const record = await Donations.findByIdAndUpdate(id, newData);

    res.status(200).json(record);
  } catch (err) {
    res.json({ status: 400, error: err.message });
  };
};

const hardDeleteRecord = async (req, res) => {
  try {
    const id = req.params.id;

    await Donations.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ status: 401, error: err.message });
  };
};

const softDeleteRecord = async (req, res) => {
try{
  const _id = req.params.id;
  const softDeletedRecord = await Donations.findById(_id).updateOne(
    { $set: { deletedAt: new Date() } },
  );

  if (!softDeleteRecord) {
    res.status(404).json({ error: "Record not found" });
      return;
    };

    res.status(200).json({status: "Success",
      message: "Entry moved to trash"
    });
} catch (err) {
    res.json({ status: 401, error: err.message });
};
};

export { listRecord, createRecord, readRecord, updateRecord, hardDeleteRecord, softDeleteRecord };