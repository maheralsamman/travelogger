const express = require('express');
const router = express.Router();
const db = require("../db");


router.get("/", async (req, res) => {
    const allTrips = await db.getAll();
    return res.json({trips: allTrips})
  });

router.post("/", async (req, res) => {
    const trip = await db.postTrip(req.body);
    return res.json({trip})
})

router.put("/:tripId", async (req, res) => {
    const tripId = req.params.tripId
    const updatedTrip = await db.updateTrip(tripId, req.body);
    return res.json({updatedTrip})
})

router.delete("/:tripId", async (req, res) => {
  const id = req.params.tripId;
  await db.deleteTrip(id)
  return res.status(200).json({msg:"trip is deleted"})
})
module.exports = router;
