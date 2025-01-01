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

  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO students SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Student
module.exports = Student;