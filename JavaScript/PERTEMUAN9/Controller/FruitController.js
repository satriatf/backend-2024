// Mengimpor data buah
const fruits = require("../data/fruits.js");

// Fungsi untuk menampilkan daftar buah
const index = ()=>{
    for(const fruit of fruits) {
        console.log(fruit);
    }
}

// Fungsi untuk menambahkan buah
const store = (name)=>{
    fruits.push(name)
    index()
}

// Fungsi untuk mengupdate data buah
const update = (position,name) =>{
    fruits[position] = name
    index()
} 

// Fungsi untuk menghapus data buah
const destroy = (position)=> {
    fruits.splice(position,1)
    index()
}

// Mengekspor fungsi-fungsi agar bisa digunakan di file lain
module.exports = {index,store,update,destroy};