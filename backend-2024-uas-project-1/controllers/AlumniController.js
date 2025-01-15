// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {
  // Mendapatkan semua data alumni
  async index(req, res) {
    // Mengambil semua data alumni
    const alumni = await Alumni.all();
    if (alumni.length > 0) {
      const data = {
        message: "Menampilkan Semua Data Alumni",
        data: alumni,
      };
      // Mengirimkan respons dengan data alumni
      res.status(200).json(data);
    } else {
      const data = {
        message: "Data Alumni Kosong",
      };
      // Mengirimkan respons jika data kosong
      res.status(200).json(data);
    }
  }

  // Menambahkan data alumni baru
  async store(req, res) {
    const {
      name, 
      phone, 
      address, 
      graduation_year, 
      status, 
      company_name, 
      position, 
    } = req.body;

    if (
      !name ||
      !phone ||
      !address ||
      !graduation_year ||
      !status ||
      !company_name ||
      !position
    ) {
      res.status(422).json({
        message: "Semua data wajib diisi!",
      });
      return;
    }

    const alumni = await Alumni.create(req.body);
    res.status(201).json({
      message: "Data alumni berhasil ditambahkan",
      data: alumni,
    });
  }

  // Mengupdate data alumni
  async update(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      const updatedAlumni = await Alumni.update(id, req.body);
      res.status(200).json({
        message: "Data alumni berhasil diperbarui",
        data: updatedAlumni,
      });
    } else {
      res.status(404).json({
        message: "Data alumni tidak ditemukan",
      });
    }
  }

  // Menghapus data alumni
  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      await Alumni.delete(id);
      res.status(200).json({
        message: "Data alumni berhasil dihapus",
      });
    } else {
      res.status(404).json({
        message: "Data alumni tidak ditemukan",
      });
    }
  }

  // Mendapatkan detail data alumni berdasarkan ID
  async show(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      res.status(200).json({
        message: "Menampilkan detail alumni",
        data: alumni,
      });
    } else {
      res.status(404).json({
        message: "Data alumni tidak ditemukan",
      });
    }
  }

  // Mencari alumni berdasarkan nama
  async search(req, res) {
    const { name } = req.query; // Mendapatkan parameter `name` dari query string
    const alumni = await Alumni.searchByName(name); // Mencari data alumni berdasarkan nama

    // Mengirimkan response berdasarkan hasil pencarian
    res.status(alumni.length > 0 ? 200 : 404).json({
      message: alumni.length > 0 ? "Hasil pencarian alumni" : "Data alumni tidak ditemukan",
      data: alumni.length > 0 ? alumni : [],
    });
  }


  // Mendapatkan alumni fresh graduate
  async findByStatus(req, res) {
    const { status } = req.query; // Mendapatkan parameter `status` dari query string
    const alumni = await Alumni.findByStatus(status); // Mencari data alumni berdasarkan status

    // Mengirimkan response berdasarkan hasil pencarian
    res.status(alumni.length > 0 ? 200 : 404).json({
      message: alumni.length > 0 ? `Menampilkan alumni dengan status ${status}` : "Data alumni tidak ditemukan",
      data: alumni.length > 0 ? alumni : [],
    });
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
