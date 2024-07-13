const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service must have a name"],
  },
  address: {
    type: String,
    required: [true, "Service must have an address"],
  },
  owner: {
    type: String,
    required: [true, "Service must have an owner"],
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);
 
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
