#!/bin/bash

# redisのキーの一覧を読み込んでpecoでフィルタリングする
# 取得した値(json)をjqでフォーマットする

target=`cat target.csv | peco`

cmd=""
if [ $1 == "hoge" ]; then

	cmd=`redis-cli -h localhost:6789 get "hogeMap:$target"`

elif [ $1 == "fuga" ]; then

	cmd=`redis-cli -h localhost:6789 get "fugaMap:$target"`

elif [ $1 == "nyao" ]; then

	cmd=`redis-cli -h localhost:6789 get "nyaoMap:$target"`

fi

if [ -z "$cmd" ]; then
	echo "$target is not $1Map Data"
	exit 0
fi

echo $cmd | jq .