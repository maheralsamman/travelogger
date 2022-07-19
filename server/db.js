require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('./models/trips');

const query = cb => async (...params) => {
    await mongoose.connect(process.env.MONGO_ACCESS, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([
            cb(...params),
            new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out")), 10000))
        ]);
        await mongoose.connection.close();
        console.log("MongoDB disconneted");
        return result;
    } catch(e) {
        await mongoose.connection.close();
        console.log(e.message);
    }
}

const getAll = query(() => Trip.find({}).exec());

const postTrip = query((body) => new Trip(body).save())

const updateTrip = query((id, body) => 
Trip.findOneAndUpdate({ _id: id }, body, { new: true }).exec()
)

const deleteTrip = query((id)=> Trip.deleteOne({_id: id}).exec())
//{_id: ObjectId('62d5bd5a1817ad0a722e6720')}

module.exports = { getAll, postTrip, updateTrip, deleteTrip }