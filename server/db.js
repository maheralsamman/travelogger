require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('./models/trips');

const query = cb => async (firstArg, params) => {
    await mongoose.connect(process.env.MONGO_ACCESS, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([
            cb(firstArg, params),
            new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out")), 10000))
        ]);
        await mongoose.connection.close();
        console.log("MongoDB disconneted");
        return result;
    } catch(e) {
        await mongoose.connection.close();
    }
}

const getAll = query(() => Trip.find({}).sort([['updatedAt', -1]]).exec());

const postTrip = query((body) => new Trip(body).save())

const updateTrip = query((id, body) => 
Trip.findOneAndUpdate({ _id:id }, body, { new: true }).exec()
)

const deleteTrip = query((id)=> Trip.deleteOne({_id: id}).exec())

module.exports = { getAll, postTrip, updateTrip, deleteTrip }