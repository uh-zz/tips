<?php

function mb_str_pad(
    $input,
    $pad_length,
    $pad_string = " ",
    $pad_style = STR_PAD_LEFT,
    $encoding = "UTF-8"
) {
    // strlen -> バイト単位の文字列の長さ
    // mb_strlen -> エンコードした後の文字列の長さ
    // $pad_length -> パディングしたい長さ
    $mb_pad_length = strlen($input) - mb_strlen($input, $encoding) + $pad_length;
    
    // 例)
    // hoge = mb_str_pad("- ほげほげ", 20);
    // 日本語はマルチバイト(UTF-8 -> 3バイト)
    // $mb_pad_length = 14( 1 + 1 + 3 * 4 ) - 6 + 20 = 28
    // 空白を左づめにして合計で20文字になる文字列
    // 20文字 = 「空白(14文字)」 + 「- ほげほげ(6文字)」 
    return str_pad(
        $input,
        $mb_pad_length,
        $pad_string,
        $pad_style
    );
}