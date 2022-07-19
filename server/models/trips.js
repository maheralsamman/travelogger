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

const sentenceCase = string => string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

TripSchema.pre('save', function (next) {
  this.country = sentenceCase(this.country);
  this.stops = this.stops.map(stop => ({...stop, city: sentenceCase(stop.city), sublocation: sentenceCase(stop.sublocation)}));
  next();
})

module.exports = mongoose.model('Trip', TripSchema);