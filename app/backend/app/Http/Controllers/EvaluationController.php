<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    public function evaluate(Request $request)//自動でインスタンスを作成し引数に渡す
    {
        // リクエストから問題文とユーザーの回答を取得
        $problemStatement = $request->input('problem_statement');
        $userAnswer = $request->input('user_answer');

        // ダミーの評価結果
        $evaluation = "Correct";

        // lecturesテーブルに保存
        $lecture = new \App\Models\Lecture();
        $lecture->problem_statement = $problemStatement;
        $lecture->user_answer = $userAnswer;
        $lecture->evaluation = $evaluation;
        $lecture->save();

        // 保存した内容をJSONで返す
        return response()->json($lecture);
    }
}


//->は.のアクセスと同じ意味
//メソッドチェーン：A()->B()のように戻り値のオブジェクトに対してさらにメソッドを呼び出すことができる
//Laravelでは、コントローラーのメソッドを呼び出すときは、通常は自動的にインスタンスが作成され、引数として渡される。
//例えば、`$request`は自動的にインスタンス化され、
//コントローラーのメソッドに渡される。これにより、リクエストのデータを簡単に扱うことができる。