const express = require("express");
const router = express.Router();
const student = require("../../models/student");

router.post("/", async (req, res) => {
  try {
    const result = await student.findOneAndUpdate(
      { admissionNo: req.body.admissionNo },
      {
        submitFillMonth: req.body.submitFillMonth,
        paidFees: req.body.paidFees,
      }
    );
    if (result) {
      res.json({ message: "Fees updated successfully.", success: true });
    } else {
      res.json({ message: "Unable to submit the fees.", success: false });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
