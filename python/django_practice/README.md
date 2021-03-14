# Djangoの勉強用のアプリ


## Dockerのbashの起動方法

```
docker exec -it django_app bash
```

## 初期設定

```
python manage.py migrate //データベースの初期設定をする
python manage.py createsuperuser //super userを作成する。これで管理画面に入れる
```

## サーバーの起動方法

ポートの指定方法(業務用のアプリが`127.0.0.1:8000`で動いていることが多いので指定することもあるでしょう)
````
python manage.py runserver 127.0.0.1:"好きなポート"
```