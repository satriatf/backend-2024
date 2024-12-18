/**
 * Fungsi untuk menampilkan hasil download
 * @param {string} result - Nama file yang didownload
 */

const showDownload = (result) => {
    return new Promise((resolve) => {
        console.log("Download selesai");
        console.log(`Hasil Download: ${result}`);
        resolve(); // Menandakan bahwa proses selesai dan Promise diselesaikan
    });
};

/**
 * Fungsi untuk download file dengan Promise
 * @returns {Promise<string>} Promise yang menghasilkan nama file yang diunduh
 */

const download = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = "windows-10.exe";
            resolve(result);
        }, 3000); // Delay 3 detik untuk proses download
    });
};

// Menggunakan Async/Await untuk memanggil download
const main = async () => {
    const result = await download();
    showDownload(result); // Memanggil showDownload untuk menampilkan hasil download
};

// Memulai eksekusi fungsi utama
main();
