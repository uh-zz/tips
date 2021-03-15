# -*- coding: utf-8 -*-
"""loggingのテスト

まあ、__main__.py見るのが一番いいと思う

Example:
    ../pythonディレクトリで
        $ python -m unittest discover -s logging_how_to 
    詳細に知りたい時は
        $ python -m unittest discover -s logging_how_to -v


ロギングの指針

print(): コマンドラインスクリプトやプログラムで普通に使う、コンソール出力の表示
logging.inro(): プログラムの通常の操作中に発生したイベントの報告 
                (例えば、状態の監視や障害の分析)
logging.debug(): 診断のための特に詳細な出力
warnings.warn(): 特定のランタイムイベントに関わる警告の発行。
                かつ、その発行が避けられるもので、
                クライアントアプリケーションを修正してその警告を排除するべきなら
logging.warning(): 特定のランタイムイベントに関わる警告の発行。
                アプリケーションにできることはないが、それでもイベントを記録するべきなら
例外の送出: 特定のランタイムイベントに関わるエラーの報告
logging.error() or logging.exception() or logging.critical():
        例外の送出をしないエラーの抑制 (例えば、長期のサーバプロセス中のエラーハンドラ)

レベル

デフォルトのレベルは WARNING で、
logging パッケージが他に設定されなければ、このレベル以上のイベントのみ追跡されます。

INFO: 想定された通りのことが起こったことの確認。
WARNING: 想定外のことが起こった、または問題が近く起こりそうである 
        (例えば、'disk space low') ことの表示。
ERROR: より重大な問題により、ソフトウェアがある機能を実行できないこと。
CRITICAL: プログラム自体が実行を続けられないことを表す、重大なエラー。

"""

import unittest
import logging
import logging.config
from test.support import captured_stdout
import os


class LoggingTest(unittest.TestCase):
    """loggingのテスト
    
    
    """
    def test_print(self):
        """print()のテスト"""
        with captured_stdout() as stdout:
            print('Watch out!')
            stdout_text = stdout.getvalue()
        self.assertEqual('Watch out!\n', stdout_text)


    def test_simple_info(self):
        """INFOのテスト"""
        # デフォルトでは LEVEL は WANINGに設定されてるから INFO は出力されない
        with self.assertLogs(logger=None,level=logging.WARNING) as cm:
            logging.warning('Watch out!')
            logging.info('I told you so')
            log_text_defalut = cm.output
        self.assertEqual(["WARNING:root:Watch out!"],log_text_defalut)

        # INFOを出力するには LEVEL を INFO 以下にする必要がある
        with self.assertLogs(logger=None,level=logging.INFO) as cm:
            logging.warning('Watch out!')
            logging.info('I told you so')
            log_text_info = cm.output
        self.assertEqual(["WARNING:root:Watch out!","INFO:root:I told you so"],log_text_info)

    def test_logging_to_file(self):
        """fileへのロギングをテスト"""
        logging.basicConfig(filename='logging_how_to/logs/example.log', level=logging.DEBUG)
        logging.debug('This message should got to the log file')
        logging.info('So should this')
        logging.warning('And this, too')
        logging.error('And non-ASCII stuff,too,like  Øresund and Malmö')

        loglevel = 'debug'
        numeric_level = getattr(logging ,loglevel.upper(), None)
        if not isinstance(numeric_level, int):
            raise ValueError('Invalid log level: %s' % loglevel)
        logging.basicConfig(level=numeric_level)
        logging.info(numeric_level)

    def test_a_logging_to_file_overwrite(self):
        """fileへのロギングをテスト(上書き)
        なんか、'w'にならないけど?
        もともとtest_logging_to_file_overwriteってメソッド名だったけど
        こいつを先に設定するためにメソッド名を変更した。

        もしかして、ファイルへのアクセスをずっと保持してる？
        """
        logging.basicConfig(filename='logging_how_to/logs/example.log',
        # filemode='w',
        level=logging.DEBUG)
        logging.warning('OVERWRITE')

    def test_logging_valiable(self):
        """ログを動的に設定する"""
        look = "Look"
        leap ="leap"
        # logging.basicConfig(filename='logging_how_to/example.log',level=logging.WARN)
        logging.warning('%s YYYYYYYYYYYYYYYYYYYYYY %s', look, leap)

    def test_a_setting_format(self):
        """フォーマットの変更"""
        logging.basicConfig(format='%(asctime)s: %(levelname)s:%(message)s',
        filename='logging_how_to/logs/example.log', 
        level=logging.DEBUG, 
        datefmt='%m/%d/%Y %I:%M:%S %p')
        logging.debug('With Format')
        logging.info('So should this')
        logging.warning('And this, too')

    def test_setting_logger_simple(self):
        """Loggerの設定方法のテスト(もっとも基本的なもの)"""
        # create logger
        logger = logging.getLogger('simple_example')
        logger.setLevel(logging.DEBUG)

        # create file handler and set level to debug
        ch = logging.FileHandler(os.path.dirname(__file__) + "/logs/test_setting.log",mode="w" )
        ch.setLevel(logging.DEBUG)

        # create formatter
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

        # add formatter to ch
        ch.setFormatter(formatter)

        # add ch to logger
        logger.addHandler(ch)

        # 'application' code
        logger.debug('debug message')
        logger.info('info message')
        logger.warning('warn message')
        logger.error('error message')
        logger.critical('critical message')
                
    def test_setting_logger_conf(self):
        """loggerの設定(.confファイルを用いる)
        あまりうまくいっていない.
        """
        logging.config.fileConfig('logging_how_to/logging.conf')

        # create logger
        logger = logging.getLogger('confExample')

        # 'application' code
        logger.debug('debug message')
        logger.info('info message')
        logger.warning('warn message')
        logger.error('error message')
        logger.critical('critical message')