#!/bin/bash

# キャッシュ用ロジック

# /hoge/fuga/.redis_search/cache.txt

# 最近使用した項目
# >>>>>>>>>>>>>>>>>>>>>
# key1
# key2
# key3
# <<<<<<<<<<<<<<<<<<<<<

cache_file="/hoge/fuga/.redis_search/cache.txt"
cache_target=`cat $cache_file`

target=`redis-cli -h localhost:6789 keys "*" | awk -F '[:]' '{print $4}' | head ` 

target=`echo -e "$cache_target\n$target" | peco`


if `echo $target | grep -q "最近使用した項目"` ; then
	echo "無効な値です。: $target"
	exit 0
fi

if `echo $target | grep -Fq "<" `; then
	echo "無効な値です。: $target"
	exit 0
fi

if `echo $target | grep -Fq ">" `; then
	echo "無効な値です。: $target"
	exit 0
fi

tmp_file="./tmp.txt"
arr=()
while read line 
do
	if `echo $line | grep -q "最近使用した項目"` ; then
		echo $line > $tmp_file
		continue
	fi

	if `echo $line | grep -Fq ">"` ; then
		echo $line >> $tmp_file
		echo $target >> $tmp_file
		arr+=( $target )
		continue
	fi

	if `echo $line | grep -Fq "<"` ; then
		echo $line >> $tmp_file
		break
	fi

	# キャッシュは20にする
	if [ 20 -lt ${#arr[@]} ];then
		continue
	fi

	if ! `echo ${arr[@]} | grep -q "$line"` ; then
		echo $line >> $tmp_file
		arr+=( $line )
		continue
	fi



done < $cache_file

cp $tmp_file $cache_file
rm $tmp_file



