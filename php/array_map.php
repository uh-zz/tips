<?php

$hoge = [
    1,
    2,
    3
];

print_r(
    array_map(
        function($x) {
            return $x + 2;
        },
        $hoge
    )
    );