const express = require('express');
require('dotenv').config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "TRAVELOGGER",
    },
});

router.use(multer({ storage }).single('photo'));

router.post("/", async (req, res) => {
    return res.json({ url: req.file.path });
  });

module.exports = router;
