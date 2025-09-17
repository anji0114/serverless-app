# API フォルダ構成設計

## APIフォルダ構成

api/
├── src/                           # アプリケーションコード
│   ├── handlers/                  # Lambda関数エントリーポイント
│   │   ├── customers/
│   │   │   ├── getCustomer.ts         # 顧客取得
│   │   │   ├── listCustomers.ts       # 顧客一覧
│   │   │   ├── createCustomer.ts      # 顧客作成
│   │   │   ├── updateCustomer.ts      # 顧客更新
│   │   │   └── deleteCustomer.ts      # 顧客削除
│   │   └── proposals/
│   │       ├── getProposal.ts         # 提案文取得
│   │       ├── listProposals.ts       # 提案文一覧
│   │       ├── createProposal.ts      # 提案文作成
│   │       ├── updateProposal.ts      # 提案文更新
│   │       ├── deleteProposal.ts      # 提案文削除
│   │       └── generateProposal.ts    # AI提案文生成
│   ├── services/                  # ビジネスロジック + DB操作
│   │   ├── customerService.ts         # 顧客関連ビジネスロジック
│   │   ├── proposalService.ts         # 提案文関連ビジネスロジック
│   │   └── aiService.ts               # AI生成サービス
│   └── entities/                  # 型定義
│       ├── customer.ts                # 顧客エンティティ
│       └── proposal.ts                # 提案文エンティティ
├── infrastructure/                # インフラストラクチャコード
│   └── stacks/
│       └── api-stack.ts               # メインAPIスタック
├── bin/                           # CDKアプリケーションエントリーポイント
│   └── api.ts                 # CDKアプリケーション起点
├── schema.grapql 
├── package.json                   # npm設定
├── tsconfig.json                  # TypeScript設定
├── .gitignore                     # Git無視ファイル
└── README.md                      # プロジェクト説明

## レイヤーアーキテクチャ
handlers: 各エンドポイントが1ファイル1機能で明確
services: ビジネスロジックとDB操作を集約
entities: 型定義とドメインロジックを統合

## 🔧 実装の流れ

1. entities で型定義
2. services でビジネスロジック実装
3. handlers でLambda関数作成
4. infrastructure でAWSリソース定義

## 規則
基本的に関数を使用する。classの使用するのは問題ないが意味を持ってclass、関数を使い分けること。