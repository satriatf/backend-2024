<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all();
        $data = [
            'message' => 'Berhasil akses data',
            'data' => $students
        ];
        return response()->json($data, 200);
    }

    public function store(Request $request) 
    {
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan
        ];
        $student = Student::create($input);
        $data = [
            'message' => 'Data berhasil ditambah',
            'data' => $student 
        ];
        return response()->json($data, 201);
    }

    public function update(Request $request, $id) 
    {
        $student = Student::find($id);
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan
        ];
        $student->update($input);
        $data = [
            'message' => 'Data berhasil diperbarui',
            'data' => $student
        ];
        return response()->json($data, 200);
    }

    public function destroy($id) 
    {
        $student = Student::find($id);
        $student->delete();
        $data = [
            'message' => 'Data berhasil dihapus',
        ];
        return response()->json($data, 200);
    }
}
