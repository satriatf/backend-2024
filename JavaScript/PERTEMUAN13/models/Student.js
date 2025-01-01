// Import konfigurasi database
const db = require("../config/database");

// Membuat class Model Student untuk mengelola operasi database pada tabel 'students'
class Student {

    // Method untuk mengambil semua data mahasiswa
    static all() {
        return new Promise((resolve, reject) => {
            // Query SQL untuk mengambil semua data
            const sql = "SELECT * from students"; 
            db.query(sql, (err, results) => {
                // Mengembalikan hasil query
                resolve(results); 
            });
        });
    }

    // Method untuk menambahkan data mahasiswa baru
    static async create(data) {
        const id = await new Promise((resolve, reject) => {
            // Query SQL untuk insert data
            const sql = "INSERT INTO students SET ?"; 
            db.query(sql, data, (err, results) => {
                resolve(results.insertId); 
            });
        });

        // Mengambil data mahasiswa berdasarkan ID
        const student = this.find(id); 
         // Mengembalikan data mahasiswa yang baru ditambahkan
        return student;
    }

    // Method untuk mencari data mahasiswa berdasarkan ID
    static find(id) {
        return new Promise((resolve, reject) => {
            // Query SQL untuk mencari data berdasarkan ID
            const sql = "SELECT * from students WHERE id = ?"; 
            db.query(sql, id, (err, results) => {
                const [student] = results; 
                // Mengembalikan data mahasiswa
                resolve(student); 
            });
        });
    }

    // Method untuk mengupdate data mahasiswa berdasarkan ID
    static async update(id, data) {
        await new Promise((resolve, reject) => {
            // Query SQL untuk update data
            const sql = "UPDATE students SET ? WHERE id = ?"; 
            db.query(sql, [data, id], (err, results) => {
                resolve(results); 
            });
        });

        // Mengambil data mahasiswa yang telah diperbarui
        const student = await this.find(id); 
        // Mengembalikan data mahasiswa yang telah diperbarui
        return student; 
    }

    // Method untuk menghapus data mahasiswa berdasarkan ID
    static delete(id) {
        return new Promise((resolve, reject) => {
            // Query SQL untuk menghapus data
            const sql = "DELETE FROM students WHERE id = ?"; 
            db.query(sql, id, (err, results) => {
                resolve(results); 
            });
        });
    }

}

// Mengekspor class Student agar dapat digunakan di file lain
module.exports = Student;
