<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

// Fungsi Middleware Sederhana
function checkJsonMiddleware() {
    // Hanya cek jika request-nya adalah POST (kirim data)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        
        // Jika Content-Type bukan JSON, tolak mentah-mentah!
        if ($contentType !== "application/json") {
            http_response_code(415); // 415 Unsupported Media Type
            echo json_encode(["error" => "Format harus berupa application/json!"]);
            exit; // Hentikan eksekusi script di sini
        }
    }
}

// Jalankan middleware-nya
checkJsonMiddleware();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    http_response_code(200);
    echo json_encode([
        'data' => [
            ['id' => 1, 'nama' => 'Router', 'jumlah' => 4],
            ['id' => 2, 'nama' => 'Multimeter', 'jumlah' => 6]
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'POST') {
    try {
        $payload = json_decode(
            file_get_contents('php://input'),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException $e) {
        http_response_code(400);
        echo json_encode(['error' => 'Format JSON tidak valid']);
        exit;
    }

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Body JSON harus berupa object']);
        exit;
    }

    $nama = trim((string) ($payload['nama'] ?? ''));
    $jumlah = filter_var($payload['jumlah'] ?? null, FILTER_VALIDATE_INT);

    if (strlen($nama) > 100) {
        http_response_code(400);
        echo json_encode(['error' => 'Nama alat tidak boleh lebih dari 100 karakter!']);
        exit;
    }

    if ($nama === '' || $jumlah === false || $jumlah < 0) {
        http_response_code(422);
        echo json_encode(['error' => 'Data tidak valid']);
        exit;
    }

    http_response_code(201);
    echo json_encode(['message' => 'Data diterima', 'data' => compact('nama', 'jumlah')]);
    exit;
}

header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method tidak diizinkan']);