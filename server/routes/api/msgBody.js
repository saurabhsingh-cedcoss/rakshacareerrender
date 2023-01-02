const express = require("express");
const router = express.Router();
const sms = require("../../models/msgBody");

router.get("/", async (req, res) => {
  try {
    const result = await sms.find();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const smsData = new sms(req.body);
  try {
    const preSavedSms = await sms.find();
    if (preSavedSms[0]._id) {
      const editRes = await editSmsText(preSavedSms[0]._id, req.body);
      if (editRes) {
        res.json({ message: "Sms text edited successfully", success: true });
      } else {
        res.json({
          message: "Unable to edit. Something went wrong.",
          success: false,
        });
      }
    } else {
      const result = await smsData.save();
      res.json("Sms text saved successfully.");
    }
  } catch (error) {
    res.json(error);
  }
});

const editSmsText = async (id, smsT) => {
  const result = await sms.findOneAndUpdate({ _id: id }, smsT);
  if (result) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;
