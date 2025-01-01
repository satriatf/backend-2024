// import Model Student
const Student = require("../models/Student");

class StudentController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const students = await Student.all();

    const data = {
      message: "Menampilkkan semua students",
      data: students,
    };

    res.json(data);
  }

  // menambahkan keyword async
  async store(req, res) {
        const { nama, nim, email, jurusan } = req.body;
        // Memanggil method create di model
        const student = await Student.create(nama, nim, email, jurusan);

        // Membuat objek data yang akan dikirimkan sebagai respons
        const data = {
            message: "Menambahkan data student",
            data: student,
        };

        // Mengirimkan respons dalam format JSON ke klien
        res.json(data);
  }


  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    const data = {
      message: `Mengedit student id ${id}, nama ${nama}`,
      data: [],
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    const data = {
      message: `Menghapus student id ${id}`,
      data: [],
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;