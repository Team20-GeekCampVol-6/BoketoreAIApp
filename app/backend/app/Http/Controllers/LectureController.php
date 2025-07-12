<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;

class LectureController extends Controller
{
    public function index(Request $request)
    {
        // ここでは、講義履歴を取得するロジックを実装します。
        // 例えば、Lectureモデルを使ってデータベースから履歴を取得するなど。

        // 今回はダミーデータを返す例です。
        $lectures = Lecture::all();

        return response()->json($lectures);
    }
}
