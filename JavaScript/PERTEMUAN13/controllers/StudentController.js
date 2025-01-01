// Import model Student
const Student = require("../models/Student");

// Membuat class StudentController untuk mengelola data mahasiswa
class StudentController {

    // Method untuk menampilkan semua data mahasiswa
    async index(req, res) {
        // Mengambil semua data mahasiswa
        const students = await Student.all(); 
        if (students.length > 0) {
            const data = {
                message: "Menampilkan Semua Students",
                data: students,
            };
            // Mengirimkan respons dengan data mahasiswa
            res.status(200).json(data); 
        } else {
            const data = {
                message: "Data Students Kosong",
            };
            // Mengirimkan respons jika data kosong
            res.status(200).json(data);
        }
    }

    // Method untuk menyimpan data mahasiswa baru
    async store(req, res) {
        // Mengambil data dari body request
        const { nama, nim, email, jurusan } = req.body; 
        if (!nama || !nim || !email || !jurusan) {
            const data = {
                message: "Semua Data harus di Kirim",
            };
            // Mengirimkan respons jika data tidak lengkap
            res.status(422).json(data); 
            return;
        }

        // Menambahkan data mahasiswa
        const student = await Student.create(req.body); 
        const data = {
            message: "Menambahkan Data Student",
            data: student,
        };
        // Mengirimkan respons dengan data mahasiswa baru
        res.json(data); 
    }

    // Method untuk mengedit data mahasiswa berdasarkan ID
    async update(req, res) {
        // Mengambil ID dari parameter URL
        const { id } = req.params; 
        // Mencari mahasiswa berdasarkan ID
        const student = await Student.find(id); 

        if (student) {
            // Mengupdate data mahasiswa
            const student = await Student.update(id, req.body); 
            const data = {
                message: "Mengedit Data Student",
                data: student,
            };
            // Mengirimkan respons dengan data yang diperbarui
            res.status(200).json(data); 
        } else {
            const data = {
                message: "Data Student Tidak Ditemukan",
            };
            // Mengirimkan respons jika data tidak ditemukan
            res.status(404).json(data); 
        }
    }

    // Method untuk menghapus data mahasiswa berdasarkan ID
    async destroy(req, res) {
        // Mengambil ID dari parameter URL
        const { id } = req.params; 
        // Mencari mahasiswa berdasarkan ID
        const student = await Student.find(id); 

        if (student) {
            // Menghapus data mahasiswa
            await Student.delete(id); 
            const data = {
                message: "Menghapus Data Student",
            };
            // Mengirimkan respons jika berhasil dihapus
            res.status(200).json(data); 
        } else {
            const data = {
                message: "Data Student Tidak Ditemukan",
            };
            // Mengirimkan respons jika data tidak ditemukan
            res.status(404).json(data); 
        }
    }

    // Method untuk menampilkan detail data mahasiswa berdasarkan ID
    async show(req, res) {
        // Mengambil ID dari parameter URL
        const { id } = req.params; 
        // Mencari mahasiswa berdasarkan ID
        const student = await Student.find(id); 

        if (student) {
            const data = {
                message: "Menampilkan Detail Student",
                data: student,
            };
            // Mengirimkan respons dengan data mahasiswa
            res.status(200).json(data); 
        } else {
            const data = {
                message: "Data Student Tidak Ditemukan",
            };
            // Mengirimkan respons jika data tidak ditemukan
            res.status(404).json(data); 
        }
    }
}

// Membuat object StudentController untuk diakses oleh file lain
const object = new StudentController();

// Mengekspor object StudentController agar bisa digunakan di file lain
module.exports = object;
