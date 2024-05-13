// const mongoose = require("mongoose");
import mongoose from "mongoose";

const entryShema = new mongoose.Schema({
  category: String,
  activity: String,
  timeInMinutes: Number,
  dateOfEntry: {
    year: Number,
    month: Number,
    day: Number,
  },
  location: String,
});

const Entries = new mongoose.model("ArnauData", entryShema);

export default Entries;
