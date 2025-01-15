// import AlumniController
const AlumniController = require("../controllers/AlumniController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni
router.get("/alumni", AlumniController.index);
router.post("/alumni", AlumniController.store);
router.put("/alumni/:id", AlumniController.update);
router.delete("/alumni/:id", AlumniController.destroy);

// Routing untuk pencarian alumni berdasarkan nama (menggunakan query parameter)
router.get("/alumni/search", AlumniController.search);

// Routing untuk filter alumni berdasarkan status (menggunakan query parameter)
router.get("/alumni/status", AlumniController.findByStatus);


// export router
module.exports = router;
