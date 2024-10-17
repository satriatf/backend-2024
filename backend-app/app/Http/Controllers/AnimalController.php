<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    private $animals = ['musang', 'monyet', 'naga'];
    public function index()
    {
        echo "Menampilkan semua hewan: <br>";
        foreach ($this->animals as $animal) {
            echo $animal . '<br>';
        }
    }
    public function store(Request $request)
    {
        echo "Menambahkan hewan baru: ";
        array_push($this->animals, $request->animal);
        $this->index(); 
    }
    public function update(Request $request, $id)
    {
        echo "Mengupdate data hewan id $id: ";
        if (isset($this->animals[$id])) {
            $this->animals[$id] = $request->animal;
        }
        $this->index();
    }
    public function destroy($id)
    {
        echo "Menghapus data hewan id $id: ";
        if (isset($this->animals[$id])) {
            array_splice($this->animals, $id, 1);
        }
        $this->index(); 
    }
}
