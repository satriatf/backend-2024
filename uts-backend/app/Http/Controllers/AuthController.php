<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        // Mengambil data input dari request dan mengenkripsi password
        $input = [
            'name' => $request->name, 
            'email' => $request->email, 
            'password' => Hash::make($request->password) 
        ];
        // Menyimpan data pengguna ke dalam database
        User::create($input);
        // Menyusun data respons jika registrasi berhasil
        $data = [
            'message' => 'User berhasil dibuat' // Pesan sukses
        ];
        // Mengembalikan response JSON dengan status kode 200
        return response()->json($data, 200);
    }

    public function login(Request $request) 
    {
        // Mengambil data input dari request untuk email dan password
        $input = [
            'email' => $request->email, 
            'password' => $request->password 
        ];
        // Mencari pengguna berdasarkan email
        $user = User::where('email', $input['email'])->first();
        // Mengecek apakah pengguna ditemukan dan password sesuai
        $isLoginSuccessful = (
            $user
            && 
            Hash::check($input['password'], $user->password) // Memverifikasi password yang diinput dengan yang tersimpan
        );
        // Jika login berhasil
        if ($isLoginSuccessful) {
            // Membuat token autentikasi untuk pengguna
            $token = $user->createToken('auth_token');
            // Menyusun data respons jika login berhasil
            $data = [
                'message' => 'Login Berhasil', 
                'token' => $token->plainTextToken 
            ];
            // Mengembalikan response JSON dengan status kode 200
            return response()->json($data, 200);
        } else {
            // Menyusun data respons jika login gagal
            $data = [
                'message' => 'Login Gagal', 
            ];
            // Mengembalikan response JSON dengan status kode 401 (Unauthorized)
            return response()->json($data, 401);
        }
    }
}

