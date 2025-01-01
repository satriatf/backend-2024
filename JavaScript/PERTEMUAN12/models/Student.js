// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from students";
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  static create(nama, nim, email, jurusan) {
    // Query SQL untuk memasukkan data ke tabel students
    const sql = `INSERT INTO students (nama, email, nim, jurusan) VALUES (?, ?, ?, ?)`;

    // Mengembalikan Promise agar bisa digunakan secara asynchronous
    return new Promise((resolve, reject) => {
      // Menjalankan query ke database
      db.query(sql, [nama, nim, email, jurusan], (err, results) => {
        // Jika berhasil, resolve promise dengan data mahasiswa yang baru ditambahkan
        resolve({ id: results.insertId, nama, nim, email, jurusan,created_at:new Date(),updated_at:new Date() });
        });
      });
    };
  }

// export class Student
module.exports = Student;