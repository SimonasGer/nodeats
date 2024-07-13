const mongoose = require("mongoose");
const repairmanSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A repairman must have a  first name."],
    },
    lastName: {
      type: String,
      required: [true, "A repairman must have a last name."],
    },
    specialization: {
      type: String,
      required: [true, "A repairman must have a specialization."],
    },
    picture: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "A repairman must have a city."],
    },
    service: {
      type: String,
      required: [true, "A repairman must have a listed service."],
    },
    likes: {
      type: Number,
      required: [true, "A repairman must have a listed sercice."],
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


const Repairman = mongoose.model("Repairman", repairmanSchema);
module.exports = Repairman;
