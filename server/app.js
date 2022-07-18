const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
// TEST
const bodyParser = require('body-parser')

const cloudinaryRouter = require("./routes/cloudinary")
const tripRouter = require("./routes/trip")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router()

router.use('/cloudinary', cloudinaryRouter);
router.use('/trips', tripRouter)

app.use("/api", router)

module.exports = app;
