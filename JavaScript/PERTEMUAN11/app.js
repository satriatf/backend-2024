// Import express dan routing
const express = require("express");
const router = require("./routes/api");

// Membuat object express
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menggunakan routing
app.use(router);

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

