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

router.put("/:id", async (req, res) => {
    const userId = req.params.id
    const updatedTrip = await db.updateTrip(userId, req.body);
    return res.json({updatedTrip})
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.deleteTrip(id)
  return res.status(204).end()
})
module.exports = router;
