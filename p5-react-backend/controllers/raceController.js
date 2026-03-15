import Registrations from "../models/raceModel.js";

const create = async (req, res) => {
  try{

    const newData = req.body;

    const record = new Registrations(newData);
    await record.save();
    res.json(record);
  }catch(err){
    res.json({error: err.message});
  };
};

const list = async (req, res) => {
  try {
    const response = await fetch("https://rundida.com/api/marathons.json",
        {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

    if (!response) {
      res.status(404).json({ error: "Record not found" });
      return;
    };

    res.json(result);

  } catch (err) {
    res.json({ status: 400,error: err.message });
  };
};

const read = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch("https://rundida.com/api/marathons/" + id + ".json",
        {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

    if (!response) {
      res.status(404).json({ error: "Record not found" });
      return;
    };

    res.json(result);

  } catch (err) {
    res.json({ status: 400,error: err.message });
  };
};

export {list, create, read}