<?php

namespace App\Http\Controllers;

use App\Services\ProblemService;
use Illuminate\Http\Request;

class ProblemController extends Controller
{
    protected $problemService;

    public function __construct(ProblemService $problemService)
    {
        $this->problemService = $problemService;
    }

    /**
     * 固定テーマで問題を生成して返す
     */
    public function generate(Request $request)
    {
        $theme = '歴史';
        
        // サービスから問題と想定解の配列を受け取る
        $problemData = $this->problemService->generate($theme);

        // エラーがあればエラーレスポンスを返す
        if (isset($problemData['error'])) {
            return response()->json($problemData, 500);
        }

        // フロントエンドにJSON形式でそのまま返す
        return response()->json($problemData);
    }
}