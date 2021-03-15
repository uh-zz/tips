# -*- coding: utf-8 -*-
"""loggingのテスト

Example:
    ../pythonディレクトリで
        $ python -m logging_how_to

"""
import os
from pathlib import Path
import logging
import logging.config
from .import my_logging

BASE_DIR = Path(__file__).resolve().parent

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": BASE_DIR / "logs/log_test.log",
            "formatter": "verbose",
            "maxBytes": 1024 * 1024 ,
            "backupCount": 100,
            "level":"DEBUG",
            "mode":"a",
            "encoding":"utf-8"
        },
        "console": {
            'class': 'logging.StreamHandler',
            "formatter": "verbose",
        },
    },
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s: %(filename)s:%(lineno)s %(funcName)s   %(message)s",
        },
    },
    "loggers": {
        "root": {
            "handlers": ["file","console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
        },
        "logging_how_to":{
            "handlers":["file","console"],
            # Djangoアプリじゃないから当然 INFO に設定されるよ
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            # "propagate": False を指定しないとrootハンドラーと二重でロギングしちゃうよ
            "propagate": False,
        }
    },
}

if __name__ == "__main__":
    logging.config.dictConfig(LOGGING)
    # 以下の関数がロギングを行っている。
    my_logging.simple_logging()