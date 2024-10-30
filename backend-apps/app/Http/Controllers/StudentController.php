<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        if ($students->isEmpty()) {
            $data = [
                'message' => 'Data tidak ditemukan',
                'data' => []
            ];
            return response()->json($data, 404);
        } else {
            $data = [
                'message' => 'Data berhasil diakses',
                'data' => $students
            ];
            return response()->json($data, 200);
        }
    }

    public function store(Request $request)
    {
        if (!$request->has(['nama', 'nim', 'email', 'jurusan'])) {
            $data = [
                'message' => 'Data gagal ditambah'
            ];
            return response()->json($data, 404);
        } else {
            $input = [
                'nama' => $request->nama,
                'nim' => $request->nim,
                'email' => $request->email,
                'jurusan' => $request->jurusan
            ];
            $student = Student::create($input);
            if ($student) {
                $data = [
                    'message' => 'Data berhasil ditambah',
                    'data' => $student
                ];
                return response()->json($data, 201); 
            } else {
                $data = [
                    'message' => 'Data gagal ditambah.',
                ];
                return response()->json($data, 404);
            }
        }
    }

    public function update(request $request, $id)
    {
        $student = Student::find($id);
        if ($student) {
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
        } else {
            $data = [
                'message' => 'Data gagal diperbarui',
            ];
            return response()->json($data, 404);
        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if ($student) {
            $student->delete();
            $data = [
                'message' => 'Data berhasil dihapus',
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Data gagal dihapus',
            ];
            return response()->json($data, 404);
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
        if ($student) {
            $data = [
                'message' => 'Data ditemukan',
                'data' => $student
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Data tidak ditemukan',
            ];
            return response()->json($data, 404);
        }
    }
}
