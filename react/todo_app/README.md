# Reactの練習用のTODOアプリ

バックエンドにGoを使っているが特にこだわりがあるわけではないので、別の言語に変える可能性もある。

## CORS対策

package.jsonに以下のように記述すると開発サーバーが`localhost:8080`によしなに投げてくれる。

[詳しくはこちらを参照](https://qiita.com/geekduck/items/6f99a3da15dd39658fff)

```json
  "proxy": "http://localhost:8080",
```