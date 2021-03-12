# -*- coding: utf-8 -*-
"""unittestの例
テストが実行される順番は文字列の組み込みの順番でメソッド名をソートした順番

Example:
    ../pythonディレクトリで
        $ python -m unittest discover -s how_to_test 
    詳細に知りたい時は
        $ python -m unittest discover -s how_to_test -v

    
"""

import datetime
import unittest

# モジュール全体のsetUp
MODULE_LIST = []


def setUpModule():
    MODULE_LIST.append(1)


# テストケースはunittest.TestCaseのサブクラスとして作成する
class TestMethods(unittest.TestCase):

    # setUpClassはテストケース全体で共有されることがわかる
    @classmethod
    def setUpClass(cls):
        cls.INT_FOR_SetUpClass = 100

    def test_setUpClass_1(self):
        self.assertEqual(TestMethods.INT_FOR_SetUpClass, 100)
        TestMethods.INT_FOR_SetUpClass += 1

    def test_setUpClass_2(self):
        self.assertEqual(TestMethods.INT_FOR_SetUpClass, 101)

    # setUpはテストメソッドが実行されるたびに実行される
    # テストケース全体で共有されるわけではない
    # もし、共有されているならtest_setUp_1かtest_setUp_2が失敗するはずである
    def setUp(self):
        self.list = ["foo", "bar", "baz"]

    # tearDownも同様にテストメソッドが実行されるたびに実行される
    def tearDown(self):
        print("Done tearDown")

    # テストメソッドはメソッド名が"test"で始まる必要がある
    def test_upper(self):
        self.assertEqual("foo".upper(), "FOO")

    def test_setUp_1(self):
        self.assertEqual(self.list, ["foo", "bar", "baz"])
        self.list = []
        self.assertEqual(self.list, [])

    def test_setUp_2(self):
        self.assertEqual(self.list, ["foo", "bar", "baz"])
        self.list = []
        self.assertEqual(self.list, [])

    # テストのスキップ
    @unittest.skip("demonstrating skipping")
    def test_always_failure(self):
        self.fail("shouldn't happen")

    # 条件付きのスキップ
    # スキップされない
    @unittest.skipIf(condition=(1 == 2), reason="1 == 2")
    def test_true_equals_false_1(self):
        self.assertEqual(True, False)

    # スキップされる
    @unittest.skipIf(condition=(1 != 2), reason="1 != 2")
    def test_true_equals_false_2(self):
        self.assertEqual(True, False)

    def test_maybe_skipped(self):
        if datetime.datetime.now() < datetime.datetime(3000, 1, 1):
            self.skipTest(reason="Now is older than AD3000!")
        self.fail()

    # setUpModule()のテスト
    def test_setUpModule(self):
        self.assertEqual(MODULE_LIST, [1])


# 既存のテストの再利用


def testSomething():
    assert 1 == 2


test_something = unittest.FunctionTestCase(testSomething,
                                           setUp=lambda: print("start"),
                                           tearDown=lambda: print("done"))


# テストスイートの作成
def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestMethods("test_upper"))
    suite.addTest(TestMethods("test_setUp_2"))
    suite.addTest(TestMethods("test_setUp_1"))
    suite.addTest(TestMethods("test_true_equals_false"))
    return suite


if __name__ == "__main__":
    runner = unittest.TextTestRunner()
    runner.run(suite())
