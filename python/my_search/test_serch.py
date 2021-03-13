# -*- coding: utf-8 -*-
"""my_searchのテスト

Example:
    ../pythonディレクトリで
        $ python -m unittest discover -s my_search
    詳細に知りたい時は
        $ python -m unittest discover -s my_search -v

    
"""

from typing import List
import unittest
import my_search
import numpy as np


def test_eval_fn(int_list: List[int]):
    """重複がなければ和を返し重複があれば負の無限大を返す評価関数"""
    if len(set(int_list)) != len(int_list):
        return -np.inf
    return sum(int_list)


class TestMySearch(unittest.TestCase):
    def test_bit_search(self):
        """bit_serchのテスト"""
        A = [1, 2, 3, 4, -10, 100, 100, 1000, 1, 2, 3, -1000]
        correct_list = [1, 2, 3, 4, 100, 1000]  # この配列がtest_eval_fnを最大にする
        correct_val = 1110  # correct_listの総和
        res_list, max_val = my_search.bit_search(A, test_eval_fn)
        self.assertEqual(res_list, correct_list)
        self.assertEqual(max_val, correct_val)
