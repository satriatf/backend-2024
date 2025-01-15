// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  // Method untuk mengambil semua data alumni
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk menambahkan data alumni baru
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results.insertId);
      });
    });

    return this.find(id);
  }

  // Method untuk mengupdate data alumni berdasarkan ID
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    return this.find(id);
  }

  // Method untuk menghapus data alumni berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk mencari data alumni berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        const [alumni] = results;
        resolve(alumni);
      });
    });
  }

  // Method untuk mencari data alumni berdasarkan nama
  static searchByName(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Mendapatkan data alumni berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status = ?";
      db.query(sql, status, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
