<?php

// PhalconでDBの接続チェック方法を模索していた時に発見
//
// 大元インスタンスがDBクライアントインスタンスを持ってるかチェックする
// -> 煩わしい、、
// 
// 元ネタ
// https://forum.phalcon.io/discussion/12669/how-to-check-if-there-is-connection-to-the-database

try {
    $this->db;
} catch (\Exception $e) {
    $this->logger->critical("error: " . $e); 
    return;
}