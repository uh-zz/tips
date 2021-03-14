from django import template
from django.http import HttpResponse
from django.http.response import HttpResponseRedirect
from django.template import loader
from django.http.request import HttpRequest
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import Question, Choice
# Create your views here.


class IndexView(generic.ListView):
    # ListView 汎用ビューは
    # <app name>/<model name>_list.html
    # というデフォルトのテンプレートを使うので、
    # template_name を使って ListView に
    # 既存の "polls/index.html" テンプレートを使用するように伝えます。
    template_name = 'polls/index.html'
    # ListView では、
    # 自動的に生成されるコンテキスト変数は question_list になります。
    # これを上書きするには、
    # context_object_name 属性を与え、
    # latest_question_list を代わりに使用すると指定します。
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now()
                                       ).order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    # 各汎用ビューは自分がどのモデルに対して動作するのか知っておく必要があります。
    # これは、 model 属性を使用して提供されます。
    model = Question
    # デフォルトでは、
    # DetailView 汎用ビューは <app name>/<model name>_detail.html
    # という名前のテンプレートを使います。
    # この場合、テンプレートの名前は "polls/question_detail.html" です。
    # template_name 属性を指定すると、
    # 自動生成されたデフォルトのテンプレート名ではなく、
    # 指定したテンプレート名を使うように Django に伝えることができます。
    # また、 results リストビューにも template_name を指定します。
    # これによって、 結果ビューと詳細ビューをレンダリングしたとき、
    # （裏側ではどちらも DetailView ですが）それぞれ違った見た目になります。
    template_name = 'polls/detail.html'

    # DetailView には question という変数が自動的に渡されます。
    # なぜなら、 Django モデル (Question) を使用していて、
    # Django はコンテキスト変数にふさわしい名前を決めることができるからです。

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def index(request: HttpRequest) -> HttpResponse:
    lates_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {'latest_question_list': lates_question_list}
    return HttpResponse(template.render(context, request))


def detail(request: HttpRequest, question_id: int) -> HttpResponse:
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(
        request=request,
        template_name='polls/detail.html',
        context={'question': question}
        )


def results(request: HttpRequest, question_id: int) -> HttpResponse:
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})


def vote(request: HttpRequest, question_id: int) -> HttpResponseRedirect:
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice: Choice = question.choice_set.get(
            pk=request.POST['choice']
            )
    except (KeyError, Choice.DoesNotExist):
        return render(
            request, 'polls/detail.html', {
                'question': question,
                'error_message': 'You didn\'t select a choice.'
                }
            )
    selected_choice.votes += 1
    selected_choice.save()
    return HttpResponseRedirect(reverse('polls:results', args=(question.id, )))
    # choice のカウントをインクリメントした後、
    # このコードは、 通常の HttpResponse ではなく HttpResponseRedirect を返します。
    # HttpResponseRedirect はひとつの引数（リダイレクト先のURL）をとります
    # (この場合にURLをどう構築するかについては、以下のポイントを参照してください)。
    # 上記の Python コメントが指摘するように、
    # POST データが成功した後は常に HttpResponseRedirect を返す必要があります。
    # これは Django 固有のものではなく、ウェブ開発における良いプラクティスです。

    # この例では、
    # HttpResponseRedirect コンストラクタの中で reverse() 関数を使用しています。
    # この関数を使うと、ビュー関数中での URL のハードコードを防げます。
    # 関数には、制御を渡したいビューの名前と、
    # そのビューに与える URL パターンの位置引数を与えます。
    # この例では、 チュートリアルその 3 で設定した URLconf を使っているので、
    # reverse() を呼ぶと、次のような文字列が返ってきます。
    # '/polls/3/results/'
