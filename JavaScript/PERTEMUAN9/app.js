// Mengimpor method dari FruitController
const { index, store, update, destroy } = require("./Controller/FruitController");

// Fungsi utama untuk menjalankan aplikasi
const main = () => {
  // Menampilkan daftar buah
  console.log("Method index - Menampilkan Buah");
  index();

  // Menambahkan buah "Pisang" ke dalam array fruits
  console.log("\nMethod store - Menambahkan buah Pisang");
  store("Pisang");

  // Mengupdate data buah pada index 0 menjadi "Kelapa"
  console.log("\nMethod update - Update data 0 menjadi Kelapa");
  update(0, "Kelapa");

  // Menghapus data buah pada index 0
  console.log("\nMethod destroy - Menghapus data 0");
  destroy(0);
};

// Menjalankan fungsi utama
main();
