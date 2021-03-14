from django.urls import path
from . import views

app_name ="polls" # アプリ固有のurlを付加する
urlpatterns = [
    # # ex: /polls/
    # path(route =  '', view= views.index, name='index'),
    # # ex: /polls/5/
    # path('<int:question_id>/',views.detail,name='detail'),
    # # ex: /polls/5/results/
    # path('<int:question_id>/results/', views.results, name='results'),
    # # ex: /polls/5/vote/
    # path('<int:question_id>/vote/', views.vote, name='vote'),
    # # <int:question_id> のように山括弧を使用すると、
    # # URLの一部が「キャプチャ」され、
    # # キーワード引数としてビュー関数に送信します。 
    # # 文字列の :question_id> 部分は、
    # # 一致するパターンを識別するために使用される名前を定義し、
    # # <int: 部分は、URLパスのこの部分に一致するパターンを決定するコンバータです。

    # 上のコメントアウトしている部分は汎用Viewを使わなかった例
    path('', views.IndexView.as_view(), name='index'),
    # DetailView 汎用ビューには、 
    # "pk" という名前で URL からプライマリキーをキャプチャして渡すことになっているので、 
    # 汎用ビュー向けに question_id を pk に変更しています。
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
