const express = require('express');
const router = express.Router();
const db = require("../db");


router.get("/", async (req, res) => {
    const allTrips = await db.getAll();
    return res.json({trips: allTrips})
  });

router.post("/", async (req, res) => {
    const trip = await db.makeDummy();
    return res.json({trip})
})

module.exports = router;
