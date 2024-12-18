// Import data students dari file data/students.js
const Students = require("../data/students");

// Membuat Class StudentController untuk mengatur CRUD data students
class StudentController {

  // Menampilkan semua data students
    index(req, res) {
    const data = {
        message: "Menampilkan Semua Students",
        data: Students,
    };
    res.json(data);
    }

  // Menambahkan data student baru
    store(req, res) {
        const { name } = req.body; 
        Students.push(name); 
        const data = {
            message: `Menambahkan Data Student: ${name}`,
            data: Students,
        };
    res.json(data);
    }

  // Mengedit data student berdasarkan ID
    update(req, res) {
        const { id } = req.params;
        const { name } = req.body; 
        Students[id] = name;
        const data = {
            message: `Mengedit Student ID ${id}, Nama ${name}`,
            data: Students,
        };
    res.json(data);
    }

  // Menghapus data student berdasarkan ID
    destroy(req, res) {
        const { id } = req.params; 
        Students.splice(id, 1);
        const data = {
            message: `Menghapus Student ID ${id}`,
            data: Students,
        };
    res.json(data);
    }
}

// Membuat object dari class StudentController
const object = new StudentController();

// Mengekspor object StudentController agar bisa digunakan di file lain
module.exports = object;
