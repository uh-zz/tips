# -*- coding: utf-8 -*-
"""探索アルゴリズムを試す。
"""
from typing import Callable, List, Tuple, TypeVar
import numpy as np

T = TypeVar('T')


def bit_search(
        input_list: List[T],
        evaluation_fn: Callable[[List[T]], float]) -> Tuple[List[T], float]:
    """評価関数が最大値を取る組み合わせをBit全探索する
    
    ------------------
    Attribute
    input_list: 探索されるリスト
    evaluation_fn: 組み合わせの良し悪しを評価する関数

    ---------------
    Return
    res_list: 最適な組み合わせ
    max_val: そのときの評価関数の値
    """
    length = len(input_list)
    max_val = -np.inf
    res_list = []
    for i in range(2**length):
        tmp_list: List[T] = []
        for n in range(length):
            if i & 1 << n:
                tmp_list.append(input_list[n])

        tmp_val = evaluation_fn(tmp_list)
        if tmp_val > max_val:
            max_val = tmp_val
            res_list = tmp_list
    return res_list, max_val
