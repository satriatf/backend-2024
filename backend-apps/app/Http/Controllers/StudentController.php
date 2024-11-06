<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        if ($students->isNotEmpty()) {
            $data = [
                'message' => 'Data berhasil diakses',
                'data' => $students
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Data tidak ditemukan',
                'data' => []
            ];
            return response()->json($data, 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'nim' => 'numeric|required',
            'email' => 'email|required',
            'jurusan' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $student = Student::create($request->all());
        $data = [
            'message' => 'Data berhasil ditambahkan',
            'data' => $student
        ];
        return response()->json($data, 201);
    }

    public function update(request $request, $id)
    {
        $student = Student::find($id);
        if ($student) {
            $input = [
                'nama' => $request->nama ?? $student->nama,
                'nim' => $request->nim ?? $student->nim,
                'email' => $request->email ?? $student->email,
                'jurusan' => $request->jurusan ?? $student->jurusan
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
