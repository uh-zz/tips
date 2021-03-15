# -*- coding: utf-8 -*-
"""loggingの練習

__main__からの呼び出しを前提に作っている
"""
import logging

def simple_logging() -> None :
    logger = logging.getLogger(__name__)
    logger.info("LOGGER NAME is %s",logger.name)
    logger.warning("NOTHING IS WARNING")
    try:
        raise Exception("This is a sample exception!")
    except Exception as e:
        logger.error(e,exc_info=True)
    logger.info("ERROR WAS IGNORED!")