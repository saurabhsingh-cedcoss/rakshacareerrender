const express = require("express");
const router = express.Router();
const student = require("../../models/student");

router.post("/", async (req, res) => {
  const studentData = new student(req.body);
  try {
    const result = await studentData.save();
    res.json({ success: true, message: "Student Registered Successfully." });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
