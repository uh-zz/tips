## 現在のブランチの確認

```
git branch
```

## 全てのブランチの確認

```
git branch -a
```

## 新しいブランチを作成して同時にチェックアウト

```
git checkout -b new/branch
```

## 過去のコミットに戻る

```
git checkout 310121e0a50660c13541441f131091fea6f3f509(コミットのsha1)
```

## 特定のコミットをmergeする
マージしたいブランチに移動して
```
git checkout main(好きなブランチ)
```
マージする
```
git merge 80ae4af(sha1のハッシュ7文字)
```