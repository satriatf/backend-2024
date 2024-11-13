<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        // Mendapatkan semua data dari tabel employees menggunakan model Employee
        $employees = Employee::all();
        // Mengecek apakah data employees tidak kosong
        if ($employees->isNotEmpty()) {
            // Jika data tidak kosong, buat response dengan pesan "Data berhasil diakses"
            $data = [
                'message' => 'Data Karyawan berhasil diakses', 
                'data' => $employees 
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data kosong, buat response dengan pesan "Data tidak ditemukan"
            $data = [
                'message' => 'Data karyawan tidak ditemukan', 
                'data' => [] 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }

    public function store(Request $request)
    {
        // Melakukan validasi terhadap data yang diterima dalam request.
        $validator = Validator::make($request->all(), [
            'name' => 'required',          
            'gender' => 'required',        
            'phone' => 'required',         
            'address' => 'required',       
            'email' => 'required',         
            'status' => 'required',        
            'hired_on' => 'required'       
        ]);
        // Mengecek apakah validasi gagal.
        if ($validator->fails()) {
            // Mengembalikan response JSON dengan error dari validator
            return response()->json($validator->errors(), 400);
        }
        $employee = Employee::create($request->all());
        // Menyusun response data yang akan dikembalikan jika data berhasil ditambahkan:
        $data = [
            'message' => 'Data Karyawan berhasil ditambahkan', 
            'data' => $employee 
        ];
        // Mengembalikan response JSON dengan data sukses dan status kode 201 (Created).
        return response()->json($data, 201);
    }

    public function show($id)
    {
        // Mencari data karyawan berdasarkan ID yang diberikan
        $employee = Employee::find($id);
        // Jika data karyawan ditemukan
        if ($employee) {
            // Menyusun response data yang akan dikembalikan jika data ditemukan
            $data = [
                'message' => 'Data Karyawan ditemukan', 
                'data' => $employee            
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan tidak ditemukan', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }
    
    public function update(Request $request, $id)
    {
        // Mencari data karyawan berdasarkan ID yang diberikan
        $employee = Employee::find($id);
        // Jika data karyawan ditemukan
        if ($employee) {
            $input = [
                'name' => $request->name ?? $employee->name,           
                'gender' => $request->gender ?? $employee->gender,     
                'phone' => $request->phone ?? $employee->phone,        
                'address' => $request->address ?? $employee->address,  
                'email' => $request->email ?? $employee->email,        
                'status' => $request->status ?? $employee->status,     
                'hired_on' => $request->hired_on ?? $employee->hired_on 
            ];
            
            // Memperbarui data karyawan dengan input baru
            $employee->update($input);
            $data = [
                'message' => 'Data Karyawan berhasil diperbarui', 
                'data' => $employee                      
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan gagal diperbarui', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }   

    public function destroy($id)
    {
        // Mencari data karyawan berdasarkan ID yang diberikan
        $employee = Employee::find($id);
        
        // Jika data karyawan ditemukan
        if ($employee) {
            // Menghapus data karyawan dari database
            $employee->delete();
            
            // Menyusun response data yang akan dikembalikan jika data berhasil dihapus
            $data = [
                'message' => 'Data Karyawan berhasil dihapus', 
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data karyawan gagal dihapus', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }

    public function search($name)
    {
        // Mencari data karyawan yang memiliki nama sesuai dengan parameter 'name' menggunakan LIKE untuk pencarian sebagian
        $employees = Employee::where('name', 'like', '%' . $name . '%')->get();
        
        // Jika data karyawan ditemukan
        if ($employees->isNotEmpty()) {
            // Menyusun response data yang akan dikembalikan jika data ditemukan
            $data = [
                'message' => 'Data Karyawan ditemukan', 
                'data' => $employees                   
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan tidak ditemukan', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }    

    public function active()
    {
        // Mencari data karyawan dengan status aktif
        $employees = Employee::where('status', 'active')->get();
        
        // Jika data karyawan ditemukan
        if ($employees->isNotEmpty()) {
            // Menyusun response data yang akan dikembalikan jika data ditemukan
            $data = [
                'message' => 'Data Karyawan aktif ditemukan', 
                'data' => $employees                    
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan aktif tidak ditemukan', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }

    public function inactive()
    {
        // Mencari data karyawan dengan status tidak aktif
        $employees = Employee::where('status', 'inactive')->get();
        
        // Jika data karyawan ditemukan
        if ($employees->isNotEmpty()) {
            // Menyusun response data yang akan dikembalikan jika data ditemukan
            $data = [
                'message' => 'Data Karyawan tidak aktif ditemukan', 
                'data' => $employees                    
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan tidak aktif tidak ditemukan', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)        
            return response()->json($data, 404);
        }
    }

    public function terminated()
    {
        // Mencari data karyawan dengan status dihentikan
        $employees = Employee::where('status', 'terminated')->get();
        
        // Jika data karyawan ditemukan
        if ($employees->isNotEmpty()) {
            // Menyusun response data yang akan dikembalikan jika data ditemukan
            $data = [
                'message' => 'Data Karyawan dihentikan ditemukan', 
                'data' => $employees                    
            ];
            // Mengembalikan response JSON dengan status kode 200 (OK)
            return response()->json($data, 200);
        } else {
            // Jika data karyawan tidak ditemukan
            $data = [
                'message' => 'Data Karyawan dihentikan tidak ditemukan', 
            ];
            // Mengembalikan response JSON dengan status kode 404 (Not Found)
            return response()->json($data, 404);
        }
    }
}
