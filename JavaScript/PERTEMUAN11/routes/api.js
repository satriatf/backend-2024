// Import StudentController dari file yang sesuai
const StudentController = require("../controllers/StudentController");

// Import express untuk membuat routing
const express = require("express");
const router = express.Router();

// Rute untuk halaman utama
router.get("/", (req, res) => {
    res.send("Hello Express");
});

// Rute untuk menampilkan data semua students
router.get("/students", StudentController.index);       

// Rute untuk menambah data student baru
router.post("/students", StudentController.store);      

// Rute untuk memperbarui data student berdasarkan ID
router.put("/students/:id", StudentController.update);  

// Rute untuk menghapus data student berdasarkan ID
router.delete("/students/:id", StudentController.destroy); 

// Mengekspor router agar bisa digunakan di aplikasi Express utama
module.exports = router;
