# -*- coding: utf-8 -*-
"""timeのテスト

このテストはたまに失敗することがある。

Example:
    ../pythonディレクトリで
        $ python -m unittest discover -s my_time
    詳細に知りたい時は
        $ python -m unittest discover -s my_time -v

"""
import unittest
import time
import datetime


class TestTime(unittest.TestCase):
    """時刻に関するテスト"""
    def test_high_accuracy(self):
        """perf_counterのほうが精度が良いらしい
        
        あまり精度は変わらなさそうに見える。(テストは失敗する)
        環境にも依るそう。
        この記事によくまとまっている
        https://hibiki-press.tech/python/time-perf-counter/4595
        """
        stop_time = 0.1
        iterate_time = int(10 / stop_time)  # だいたい20秒くらいかかる
        count_miss = 0  # perfの方が不正確だった回数
        for n in range(iterate_time):
            start_time_perf = time.perf_counter()
            time.sleep(stop_time)
            end_time_perf = time.perf_counter()
            diff_perf = abs(stop_time - (end_time_perf - start_time_perf))

            # start_time_now = datetime.datetime.now()
            # time.sleep(stop_time)
            # end_time_now = datetime.datetime.now()
            # diff_now = abs( stop_time - (end_time_now - start_time_now).total_seconds() )

            start_time_now = time.time()
            time.sleep(stop_time)
            end_time_now = time.time()
            diff_now = abs(stop_time - (end_time_now - start_time_now))

            if diff_perf > diff_now:
                count_miss += 1
        print("count_miss: ", count_miss / iterate_time * 100, "%")
        self.assertGreater(int(0.1 * iterate_time), count_miss)

    def test_perf_counter_2(self):
        """time.perf_counterのテスト:2桁目

        たまに失敗する
        """
        start_time = time.perf_counter()
        time.sleep(1)
        end_time = time.perf_counter()
        # 小数点2桁目まであってるかチェック
        self.assertAlmostEqual(end_time - start_time, 1.0, places=2)

    @unittest.skip
    def test_perf_counter_3(self):
        """time.perf_counterのテスト:3桁目
        
        3桁目はめったに成功しない
        """
        start_time = time.perf_counter()
        time.sleep(1)
        end_time = time.perf_counter()
        # 小数点3桁目まであってるかチェック
        self.assertAlmostEqual(end_time - start_time, 1.0, places=3)

    @unittest.skip
    def test_perf_counter_4(self):
        """time.perf_counterのテスト:4桁目
        
        4桁目は成功しない
        """
        start_time = time.perf_counter()
        time.sleep(1)
        end_time = time.perf_counter()
        # 小数点4桁目まであってるかチェック
        self.assertAlmostEqual(end_time - start_time, 1.0, places=4)
