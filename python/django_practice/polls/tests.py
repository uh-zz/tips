# import unittest
from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from django.db import connection, reset_queries
from django.conf import settings
from .models import Question
"""
    Example: python manage.py test polls

    より詳細に知りたい時は
    python manage.py test polls -v {0,1,2,3}
    おすすめは2

"""

# 一応、通常のunittest.TestCaseでも実行してくれる
# class QuestionModelTests(unittest.TestCase):


# テストのための特別なデータベースを作成します
# テスト用のメソッドとして、test で始まるメソッドを探します
class QuestionModelTests(TestCase):
    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """

        future_time = timezone.now() + timezone.timedelta(days=30)
        future_question = Question(pub_date=future_time)
        self.assertIs(future_question.was_published_recently(), False)

    def test_was_published_recently_with_recent_question(self):
        """
        was_published_recently() returns True for questions whose pub_date
        is within the last day.
        """
        almost_one_month_ago_time = timezone.now(
        ) - timezone.timedelta(hours=23, minutes=59, seconds=59)
        recent_question = Question(pub_date=almost_one_month_ago_time)
        self.assertIs(recent_question.was_published_recently(), True)

    def test_query_sets(self):
        """django.db.connectionのテスト"""
        # django.db.connection は
        # DEBUG = True
        # じゃないと使えない。
        settings.DEBUG = True
        # reset_queries()で履歴を消去
        reset_queries()
        for n in range(5):
            now = timezone.now()
            question = Question(pub_date=now,question_text="hoge")
            question.save()
        query_set = Question.objects.all()
        sum_text = ""
        for question in query_set:
            sum_text += question.question_text
        self.assertEqual(sum_text,"hoge"*5)

        # connection.queries で発行されたSQLの履歴を見ることができる
        # print(connection.queries)
        
        # 今回はINSERT5回に、SELECT一回なので
        # connection.queries の数は6回
        self.assertEqual(len(connection.queries),6)
        settings.DEBUG = False


def create_question(question_text, days):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    time = timezone.now() + timezone.timedelta(days=days)
    return Question.objects.create(question_text=question_text, pub_date=time)


class QuestionIndexViewTests(TestCase):
    def test_no_questions(self):
        """
        If no questions exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('polls:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_past_question(self):
        """
        Questions with a pub_date in the past are displayed on the
        index page.
        """
        create_question(question_text="Past question.", days=-30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
            )

    def test_future_question(self):
        """
        Questions with a pub_date in the future aren't displayed on
        the index page.
        """
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_future_question_and_past_question(self):
        """
        Even if both past and future questions exist, only past questions
        are displayed.
        """
        create_question(question_text="Past question.", days=-30)
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
            )

    def test_two_past_questions(self):
        """
        The questions index page may display multiple questions.
        """
        create_question(question_text="Past question 1.", days=-30)
        create_question(question_text="Past question 2.", days=-5)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question 2.>', '<Question: Past question 1.>']
            )

class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """
        The detail view of a question with a pub_date in the future
        returns a 404 not found.
        """
        future_question = create_question(question_text='Future question.', days=5)
        url = reverse('polls:detail', args=(future_question.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        """
        The detail view of a question with a pub_date in the past
        displays the question's text.
        """
        past_question = create_question(question_text='Past Question.', days=-5)
        url = reverse('polls:detail', args=(past_question.id,))
        response = self.client.get(url)
        self.assertContains(response, past_question.question_text)
