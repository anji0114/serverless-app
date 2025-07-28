# Proposy - 営業支援エージェント

提案文生成に特化した営業支援エージェントシステム

## 概要

ProposyはAWS CDK、AppSync、Lambda、GraphQLを使用した営業支援エージェントです。  
顧客情報を基に最適な提案文を自動生成することで、営業活動の効率化を実現します。

## 技術スタック

### API
- **TypeScript** - 型安全な開発
- **Node.js** - ランタイム環境
- **GraphQL** - APIクエリ言語
- **AWS AppSync** - GraphQL API サービス
- **AWS Lambda** - サーバーレス関数
- **Amazon DynamoDB** - NoSQLデータベース
- **AWS CDK** - インフラストラクチャ as Code

### フロントエンド（予定）
- **Next.js** - Reactフレームワーク
- **TypeScript** - 型安全な開発
- **App Router** - ルーティング
- **GraphQL** - データフェッチング
- **Apollo Client** - GraphQLクライアント
- **Tailwind CSS** - CSSフレームワーク

## 機能

### 現在の機能
- 顧客情報の管理（作成・取得・一覧表示）
- GraphQL APIによるデータ操作

### 計画中の機能
- **提案文生成** - AIを活用した顧客向け提案文の自動生成
- **顧客分析** - 顧客データの分析と洞察
- **テンプレート管理** - 提案文テンプレートの管理
- **多様な出力形式** - PDF、Word、PowerPointでの提案書出力

## プロジェクト構造

```
proposy/
├── README.md                          # プロジェクト全体のドキュメント
├── api/                              # バックエンドAPI
│   ├── bin/
│   │   └── api.ts                    # CDKエントリーポイント
│   ├── lib/
│   │   ├── stacks/                   # CDKスタック
│   │   │   ├── api-stack.ts          # AppSync & DynamoDB
│   │   │   └── ai-stack.ts           # AI関連リソース
│   │   └── shared/                   # 共有設定・ユーティリティ
│   │       ├── config.ts
│   │       └── types.ts
│   ├── src/
│   │   ├── functions/                # Lambda関数
│   │   │   ├── customers/            # 顧客管理
│   │   │   │   ├── get-customer.ts
│   │   │   │   ├── list-customers.ts
│   │   │   │   └── create-customer.ts
│   │   │   └── proposals/            # 提案文生成
│   │   │       ├── generate-proposal.ts
│   │   │       ├── save-proposal.ts
│   │   │       └── get-proposal.ts
│   │   ├── services/                 # ビジネスロジック
│   │   │   ├── customer-service.ts
│   │   │   ├── proposal-service.ts
│   │   │   └── ai-service.ts         # AI統合サービス
│   │   ├── models/                   # データモデル
│   │   │   ├── customer.ts
│   │   │   └── proposal.ts
│   │   └── utils/                    # ユーティリティ関数
│   │       ├── dynamodb-utils.ts
│   │       └── validation.ts
│   ├── schemas/                      # GraphQLスキーマ
│   │   ├── schema.graphql            # メインスキーマ
│   │   ├── customer.graphql          # 顧客関連スキーマ
│   │   └── proposal.graphql          # 提案関連スキーマ
│   ├── test/                         # テスト
│   ├── package.json
│   ├── tsconfig.json
│   └── cdk.json
│
├── frontend/                         # フロントエンド
│   ├── src/
│   │   ├── app/                      # App Router
│   │   │   ├── customers/            # 顧客管理画面
│   │   │   └── proposals/            # 提案文管理画面
│   │   ├── components/               # React コンポーネント
│   │   │   ├── ui/                   # 汎用UIコンポーネント
│   │   │   ├── customers/            # 顧客関連コンポーネント
│   │   │   └── proposals/            # 提案関連コンポーネント
│   │   ├── hooks/                    # カスタムフック
│   │   │   ├── use-customers.ts
│   │   │   └── use-proposals.ts
│   │   ├── lib/                      # ライブラリ・設定
│   │   │   ├── apollo-client.ts      # GraphQLクライアント
│   │   │   └── utils.ts              # ユーティリティ
│   │   ├── types/                    # TypeScript型定義
│   │   │   └── api.ts                # API型定義
│   │   └── styles/                   # スタイル
│   │       └── globals.css
│   ├── public/                       # 静的ファイル
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── package.json                      # ルートpackage.json
└── .gitignore
```

## セットアップ

### 前提条件
- Node.js 22以上
- AWS CLI設定済み
- AWS CDK CLI (`npm install -g aws-cdk`)

### インストール
```bash
# 依存関係のインストール
pnpm install

# CDKブートストラップ（初回のみ）
cdk bootstrap

# インフラのデプロイ
cdk deploy
```

## GraphQL API

### クエリ例

```graphql
# 顧客一覧取得
query {
  listCustomers {
    id
    name
  }
}

# 特定顧客取得
query {
  getCustomer(id: "customer-id") {
    id
    name
    nameLength
  }
}

# 顧客作成
mutation {
  createCustomer(input: {
    name: "株式会社サンプル"
  }) {
    id
    name
  }
}
```

## 開発

### テスト実行
```bash
pnpm test
```

### ローカル開発
```bash
# 変更を監視してデプロイ
cdk deploy --hotswap
```

## 今後の開発計画

1. **提案文生成機能の実装**
   - OpenAI APIまたはBedrock統合
   - 顧客情報を基にした提案文生成

2. **顧客データ拡張**
   - 業界、規模、過去の取引履歴
   - 顧客ニーズの分析

3. **UIの構築**
   - Next.jsを使用したWebインターフェース
   - 直感的な提案文生成・編集画面

4. **出力機能**
   - PDF/Word/PowerPoint形式での出力
   - メール送信機能

## ライセンス

Private
