import Activities from "../models/activityModel.js";
import cloudinary from "../configs/cloudinary.js";

const list = async (req, res) => {
  try {
    const records = await Activities.find();

    if (!records) {
      res.status(404).json({ error: "Record not found" });
      return;
    };

    res.json(records);

  } catch (err) {
    res.json({ status: 400,error: err.message });
  };
};


const create = async (req, res) => {
    const {    activityName,
    activityType,
    date,
    description,
    distance,
    gear,
    totalTime,
    elevGain,
    } = req.body;
    const files = [];

    if (req.files && req.files.length > 0 ){
        for (const file of req.files){
            const b64 = Buffer.from(file.buffer).toString("base64");

            const dataURI = `data:${file.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "files",
                resource_type: "auto",
            });

            files.push({
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format
            });
        };
    };

    const activity = await Activities.create({
    activityName,
    activityType,
    date,
    description,
    distance,
    gear,
    totalTime,
    elevGain,
    files
    });

    res.json({
        success: true,
        data: activity,
    });
};

const read = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Activities.findById(id);

    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }
    res.json(record);
  } catch (err) {
    res.json({ status: 400, error: err.message });
  };
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const record = await Activities.findByIdAndUpdate(id, newData);

    res.status(200).json(record);
  } catch (err) {
    res.json({ status: 400, error: err.message });
  };
};

const hardDelete = async (req, res) => {
  try {
    const id = req.params.id;

    await Activities.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    res.json({ status: 401, error: err.message });
  };
};

const softDelete = async (req, res) => {
try{
  const _id = req.params.id;
  const softDeletedRecord = await Activities.findById(_id).updateOne(
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

export {list, create, read, update, hardDelete, softDelete}