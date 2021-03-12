# -*- coding: utf-8 -*-
"""my_json.pyのテスト

Example:
   ../pythonディレクトリで
      $ python -m unittest 
"""
import unittest
import json
from . import my_json


class TestJson(unittest.TestCase):
    def test_read_json(self):
        """ my_json.read_json_file()のテスト"""
        dict_read = my_json.read_json_file("my_json/test_json_read.json")
        right_dict = {"hoge": "fuga", "foo": "bar", "un": ["deux", "trois"]}
        self.assertEqual(right_dict, dict_read)

    def test_write_json(self):
        """my_json.write_json_to_file()のテスト"""
        data_written = {"hoge": ["fuga", "piyo"], "number": [1, 2, 3, 4, 5]}
        file_path = "my_json/test_json_written.json"
        my_json.write_json_to_file(dict_data=data_written, file_path=file_path)
        with open(file_path, "r") as f:
            data_read = json.load(f)
        self.assertEqual(data_written, data_read)
