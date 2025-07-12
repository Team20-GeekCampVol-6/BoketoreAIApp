<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Services\EvaluationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class EvaluationController extends Controller
{

    protected $evaluationService;

    public function __construct(EvaluationService $evaluationService)
    {
        // サービスクラスのインスタンスを注入
        $this->evaluationService = $evaluationService;
    }


    public function evaluate(Request $request)//自動でインスタンスを作成し引数に渡す
    {
        $problemStatement = $request->input('problem_statement');//URLの場合?param=val //FormDataの場合param=val
        $modelAnswer = $request->input('model_answer');
        $userAnswer = $request->input('user_answer');

        // AIによる評価を実行
        //evaluateとaiResponseを配列で返す
        $evaluationData = $this->evaluationService->evaluateWithAI(
            $problemStatement,
            $modelAnswer,
            $userAnswer
        );

        // エラーがあればエラーレスポンスを返す
        if (isset($evaluationData['error'])) {
            return response()->json($evaluationData, 500);
        }

        // 評価結果をDBに保存
        $lecture = $this->saveEvaluation($problemStatement, $modelAnswer, $userAnswer, $evaluationData);

        // フロントエンドにJSON形式で返す
        return response()->json($lecture);
    }


    /**
     * 評価結果をデータベースに保存する
     *
     * @param string $problem
     * @param string $answer
     * @param string $modelAnswer
     * @param array $evaluationData
     * @return \App\Models\Lecture
     */
    private function saveEvaluation(string $problem, string $modelAnswer, string $userAnswer, array $evaluationData): \App\Models\Lecture
    {
        $lecture = new Lecture();
        $lecture->problem_statement = $problem;
        $lecture->user_answer = $userAnswer;
        $lecture->model_answer = $modelAnswer;
        $lecture->evaluation = $evaluationData['evaluation'];//評価
        $lecture->ai_response = $evaluationData['aiResponse'];//AIの応答
        $lecture->save();

        return $lecture;
    }
}


//->は.のアクセスと同じ意味
//メソッドチェーン：A()->B()のように戻り値のオブジェクトに対してさらにメソッドを呼び出すことができる
//Laravelでは、コントローラーのメソッドを呼び出すときは、通常は自動的にインスタンスが作成され、引数として渡される。
//例えば、`$request`は自動的にインスタンス化され、
//コントローラーのメソッドに渡される。これにより、リクエストのデータを簡単に扱うことができる。