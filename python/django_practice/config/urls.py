"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    # include() 関数は他の URLconf への参照することができます。 
    # Django が include() に遭遇すると、
    # そのポイントまでに一致した URL の部分を切り落とし、
    # 次の処理のために残りの文字列をインクルードされた URLconf へ渡します。
    path(route='polls/',view=include('polls.urls')),
    # 引数 route
    # route は URL パターンを含む文字列です。
    # リクエストを処理するとき、Django は urlpatterns のはじめのパターンから開始し、リストを順に下に見ていきます。
    # 要求された URL を一致するものを見つけるまで各パターンと比較します。
    # パターンはGETやPOSTのパラメーター、そしてドメイン名を検索しません。
    # 例えば、 https://www.example.com/myapp/ へのリクエストにおいては、
    # URLconfは myapp/ を見ます。 https://www.example.com/myapp/?page=3 
    # へのリクエストにおいても、URLconfは myapp/ を見ます。

    # 引数 view
    # Django がマッチする正規表現を見つけると、 
    # Django は指定されたビュー関数を呼び出します。
    # その際は HttpRequest オブジェクトを第一引数に、
    # そしてキーワード引数としてrouteから「キャプチャされた」値を呼び出します。
    # この例はこの後すぐ出てきます。

    # 引数 kwargs
    # 任意のキーワード引数を辞書として対象のビューに渡せます。

    # 引数 name
    # URL に名前付けをしておけば Django のどこからでも明確に参照でき、
    # とくにテンプレートの中で有効です。
    # この便利な機能のおかげで、
    # プロジェクトのURLにグローバルな変更を加える場合にも
    # 1つのファイルを変更するだけで済むようになります。
    
    path('admin/', admin.site.urls),
]
