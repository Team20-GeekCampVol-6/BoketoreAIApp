<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProblemService
{
    /**
     * テーマに基づき、Geminiに「問題文」と「想定解」のセットを生成させる
     * @return array ['problemStatement' => string, 'modelAnswer' => string]
     */
    public function generate(string $theme): array
    {
        $apiKey = config('services.google.key'); // configのキーをgoogleに変更
        if (!$apiKey) {
            Log::error('Google API key is not set.');
            return ['error' => 'APIキーが設定されていません。'];
        }

        // Gemini APIのエンドポイントURL
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key={$apiKey}";

        // プロンプトは同じものが使えます
        $prompt = 
            "あなたはあるテーマについて詳しいですが、時々自信満々に大きな間違いをするポンコツAIです。そんなあなたの間違いを含む説明に対し、ユーザーが正しい解説をすることで、学習につながる学習ゲームを作ろうと思っています。
            以下のテーマの中の何かについて、間違いを含む説明をしてください。

            テーマ：{$theme}
            出力は必ず以下のJSON形式に従ってください。
            {
            \"problemStatement\": \"テーマに関する、間違いも真実も含む、もっともらしく間違った豆知識を70文字以内で生成してください。なるべくテンションは高く自信満々に。敬語で。\",
            \"modelAnswer\": \"problemStatementの間違いを正す、100文字程度の簡潔な解説文を生成してください。\"
            }";

        // リクエストの形式をGeminiの仕様に合わせる
        $response = Http::timeout(60)
            ->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'responseMimeType' => 'application/json', // JSONモードを有効化
                    'temperature' => 0.8,
                ]
            ]);

        if ($response->failed()) {
            Log::error('Google API request failed.', ['response' => $response->json()]);
            return ['error' => '問題の生成に失敗しました。'];
        }
        
        // レスポンスの形式もGeminiの仕様に合わせる
        // Geminiのレスポンスは、テキストとしてJSONが返ってくるため、再度デコードが必要
        $generatedText = $response->json('candidates.0.content.parts.0.text');
        
        return json_decode($generatedText, true);
    }
}