# API フォルダ構成設計

## 現状の課題
- 拡張性が低い
- 責務の分離が不明確
- Lambda関数とCDKコードが混在

## 提案する新しいフォルダ構成

```
api/
├── src/                    # アプリケーションコード
│   ├── functions/          # Lambda関数のエントリーポイント
│   │   └── graphql/
│   │       └── getCustomer/
│   │           └── index.ts
│   ├── resolvers/          # GraphQLリゾルバー
│   │   └── customer.ts
│   ├── services/           # ビジネスロジック層
│   │   └── customerService.ts
│   ├── repositories/       # データアクセス層
│   │   └── customerRepository.ts
│   ├── entities/           # ドメインモデル
│   │   └── customer.ts
│   ├── utils/              # 共通ユーティリティ
│   │   ├── logger.ts
│   │   └── response.ts
│   └── types/              # 型定義
│       ├── generated/      # GraphQL自動生成型
│       └── custom.ts       # カスタム型定義
├── infrastructure/         # インフラストラクチャコード
│   ├── stacks/
│   │   └── api-stack.ts
│   ├── constructs/         # 再利用可能なConstruct
│   │   └── lambda-api.ts
│   └── config/             # 環境別設定
│       ├── dev.ts
│       └── prod.ts
├── test/                   # テストコード
│   ├── unit/
│   │   ├── services/
│   │   └── repositories/
│   └── integration/
│       └── graphql/
├── schema/                 # GraphQLスキーマ定義
│   ├── schema.graphql
│   └── codegen.yml         # GraphQL Code Generator設定
├── scripts/                # ビルド・デプロイスクリプト
├── bin/                    # CDKアプリケーションエントリーポイント
├── package.json
├── tsconfig.json
├── jest.config.js
└── .gitignore
```

## レイヤーアーキテクチャ

### 1. Functions層（エントリーポイント）
- Lambda関数のハンドラー
- リクエストの受け取りとレスポンスの返却
- エラーハンドリング

### 2. Resolvers層
- GraphQLのリゾルバー実装
- 入力値のバリデーション
- Service層の呼び出し

### 3. Services層（ビジネスロジック）
- ビジネスルールの実装
- トランザクション管理
- 複数のRepositoryの協調

### 4. Repositories層（データアクセス）
- データベースアクセス
- 外部APIの呼び出し
- データの永続化

### 5. Entities層（ドメインモデル）
- ビジネスオブジェクトの定義
- ドメインロジックの実装

## 主な利点

1. **高い拡張性**
   - 新機能追加時は各レイヤーに対応するファイルを追加するだけ
   - 既存機能への影響を最小限に抑制

2. **明確な責務分離**
   - 各レイヤーの役割が明確
   - テストが書きやすい

3. **開発スピードの向上**
   - ファイルの場所が予測可能
   - コードの再利用が容易

4. **インフラとアプリケーションの分離**
   - CDKコードとビジネスロジックが混在しない
   - デプロイ設定の管理が容易

## 移行手順

1. 新しいフォルダ構造を作成
2. 既存のコードを適切なレイヤーに移動
3. import文の更新
4. テストの実行と修正
5. CDKスタックの更新

## 命名規則

- **Functions**: `{operation}{Resource}/index.ts` (例: `getCustomer/index.ts`)
- **Services**: `{resource}Service.ts` (例: `customerService.ts`)
- **Repositories**: `{resource}Repository.ts` (例: `customerRepository.ts`)
- **Resolvers**: `{resource}.ts` (例: `customer.ts`)