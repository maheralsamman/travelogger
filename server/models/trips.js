const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopSchema = new Schema({
    city: {type: String, required: true},
    sublocation: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true, maxLength: 200},
})

const TripSchema = new Schema(
  {
    userId: {type: String, required: true},
    country: {type: String, required: true},
    stops: [{type: StopSchema, required: true}],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', TripSchema);