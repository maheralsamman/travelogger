require('dotenv').config();
const mongoose = require('mongoose');
const Trips = require('./models/trips');

const query = cb => async params => {
    await mongoose.connect(process.env.MONGO_ACCESS, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([
            cb(params),
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

const getAll = query(() => Trips.find({}));

const makeDummy = query(() => Trips.create({
        userId: "dummyid",
        country: "acountry",
        stops: [{
            city: "acity",
            sublocation: "asublocation",
            imageUrl: "aurl",
            description: "adescription",
        }],
}))

module.exports = { getAll, makeDummy }