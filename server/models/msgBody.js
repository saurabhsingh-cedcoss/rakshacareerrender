const mongoose = require("mongoose");
const smsTextSchema = new mongoose.Schema({
  smsText: {
    type: String,
    required: false,
    default: "",
  },
  feesMsg: {
    type: String,
    required: false,
    default: "",
  },
  holidayMsg: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("smsText", smsTextSchema);
