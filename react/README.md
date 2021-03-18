# このディレクトリの目的

TypeScriptのディレクトリあるけどReactはかなり作り込まれたライブラリなので別のセクションを設ける。

# nodeのバージョン管理の方法

```
nvm install --lts
nvm use 14.16(your installed version)
```

# Reactアプリの作り方

```
npx create-react-app my-app --template typescript
```

# Propsのフィールドの名付け方

どの文脈で使われるのかより、そのコンポーネント固有の観点から名前をつけた方がいい。

# PropsはImmutable

React Component はPropsに対して純粋な関数として振舞わないといけない。