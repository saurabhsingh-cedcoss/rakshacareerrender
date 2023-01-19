const express = require("express");
const router = express.Router();
const student = require("../../models/student");
router.post("/", async (req, res) => {
  try {
    console.log(req.body, req.query, "query");
    if (Object.keys(req.body).length === 0) {
      const stu = await student.find();
      res.json(stu);
    }else if (req.body.hasOwnProperty('addmissionFor')) {
      const stu = await student.find({ addmissionFor: { $in: req.body.addmissionFor } });
      res.json(stu);
    } else if (req.body.hasOwnProperty('session')  ) {
      const stu = await student.find({ session: { $in: req.body.session } });
      res.json(stu);
    }
  } catch (error) {
    res.send("Error occured: " + error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const result = await student.remove(req.body);
    if (result.deletedCount) {
      res.json({
        message: "Student data deleted successfully.",
        success: true,
      });
    } else {
      res.json({ message: "Unable to delete.", success: false });
    }
  } catch (error) {
    res.send("Error occured: " + error);
  }
});

router.post("/editStudent", async (req, res) => {
  try {
    const result = await student.findOneAndUpdate(
      { admissionNo: req.body.admissionNo },
      req.body
    );
    if (result) {
      res.json({ message: "Student updated successfully.", success: true });
    } else {
      res.json("Unable to Student data.");
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
