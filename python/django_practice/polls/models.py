from django.db import models
# timezoneを指定しないdatetimeオブジェクトを使うとと警告が大量に出るので
# 基本的にdatetimeは使わないでdjango.utils.timezoneを使う方が良い。
from django.utils import timezone
# モデルを有効にするためにはsettings.pyのINSRALLED_APPSに設定を追加する必要がある
# そのあと
# migrationファイルを作成
# python manage.py makemigrations
# migrationを実行
# python mangage.py migrate
# する必要がある。
# もし、pollsアプリだけ更新したいならば
# python manage.py mikemigrations polls
# とすればよい。

# migrateで実行されるSQLを知りたい時は
# python manage.py sqlmigrate polls 0001(好きな番号)
# とする。

# 管理画面で編集できるようにするためには
# polls.admin.py を編集する必要がある。


class Question(models.Model):
    # 主キー (primary key, ID) は自動的に追加されます (この挙動もオーバライド可能です)。
    # 特に設定しなければ id というフィールド名でアクセスできます。
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField(verbose_name='date published')

    def __str__(self):
        return self.question_text

    # Field の最初の位置引数には、オプションとして人間可読なフィールド名も指定できます。
    # このフィールド名は Django の二つの内省機能で使う他、
    # ドキュメントとしての役割も果たします。
    # 人間可読なフィールド名を指定しない場合、 Django は機械可読な名前を使います。
    # 上の例では、 Question.pub_date にだけ人間可読なフィールド名を指定しました。
    # モデルの他のフィールドでは、
    # フィールドの機械可読な名前は人間可読な名前としても十分なので定義していません。

    def was_published_recently(self):
        return timezone.now(
        ) - timezone.timedelta(days=1) <= self.pub_date <= timezone.now()

    # 管理画面のために下記を追加
    # ソートに使用できるようにする
    was_published_recently.admin_order_field = 'pub_date'
    # booleanにする
    was_published_recently.boolean = True
    # list_displayの表示名を変更する
    was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
    # 多対一の関係のときはForeignKeyを使う
    # 外部キーが削除されたら一緒に消したい時は on_delete=models.CASCADE
    # と指定しよう

    # 便宜上、 Django は外部キーのフィールド名に "_id" を追加します。
    # もちろんこの挙動もオーバライド可能です。
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
