# ESLintの設定の自分的ベストプラクティスを構成したい

## typescriptのはじめかた(react-create-appなどのツールを使わない方法)

```
yarn init
yarn add --dev typescript
npx tsc --init
```

## 保存するたびに自動でフォーマッターにかけるときは

`.vscode/setting.json`を下のように設定する

```
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}
```

## prettier(ESlintより強い自動フォーマッタ)の使い方

```
npm install --save-dev eslint
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
npm install --save-dev prettier
```

eslintrc.jsに追記

```
module.exports = {
    "extends": ["prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                // 各種設定
            }
        ]
    }
}
```
