<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\EvaluationController; // Bさんのコントローラーも念のため追加

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// ユーザー認証が必要なルート（今回は使わないが、将来のために残しておく）
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// --- ここからが私たちが追加するルートです ---

// 【Aさん担当】問題生成API
Route::get('/problem', [ProblemController::class, 'generate']);

// 【Aさん担当】講義履歴取得API
Route::get('/lectures', [LectureController::class, 'index']);

// 【Bさん担当】回答評価API（Bさんの作業場所）
Route::post('/evaluate', [EvaluationController::class, 'evaluate']);

