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

## 特定のフォルダーを履歴からも消す

消す手順
```
git filter-branch --tree-filter "rm -f -r [消したいディレクトリパス] " HEAD
git gc --aggressive --prune=now
git push -f
```

よく起るエラー

```
A previous backup already exists in refs/original/
Force overwriting the backup with -f
``
これが出たら

```
git update-ref -d refs/original/refs/heads/master
```