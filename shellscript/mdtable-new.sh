#!/bin/bash

# usage
# `bash create_mdtable.sh hoge.csv > table.txt`

# input
# 2020.01.01,1000,500,50,6000,50,10,1
# 2020.01.02,1000,500,50,6000,50,10,1
# 2020.01.03,1000,500,50,6000,50,10,1
# 2020.01.04,1000,500,50,6000,50,10,1
# 2020.01.05,1000,500,50,6000,50,10,1
# 2020.01.06,1000,500,50,6000,50,10,1

# output
# | No1 | 2020.01.01 | 2020.01.02 | 2020.01.03 | 2020.01.04 | 2020.01.05 |
# | --: | ---------: | ---------: | ---------: | ---------: | ---------: |
# | No2 |       1000 |       1000 |       1000 |       1000 |       1000 |
# | No3 |        500 |        500 |        500 |        500 |        500 |
# | No4 |         50 |         50 |         50 |         50 |         50 |
# | No5 |        50% |        50% |        50% |        50% |        50% |
# | No6 |       6000 |       6000 |       6000 |       6000 |       6000 |
# | No7 |         50 |         50 |         50 |         50 |         50 |
# | No8 |         10 |         10 |         10 |         10 |         10 |
# | No9 |          1 |          1 |          1 |          1 |          1 |

text_no1="| No1"
text_no2="| No2"
text_no3="| No3"
text_no4="| No4"
text_no5="| No5"
text_no6="| No6"
text_no7="| No7"
text_no8="| No8"
text_no9="| No9"

is_new=false

column_count=0

while read line 
do
	column_count=$(( column_count + 1))

	arr=( `echo $line | tr -s ',' ' '`)

	#	echo ${arr[@]}

	format_no1=`printf '%-10s' ${arr[0]}`
	format_no2=`printf '%-4s' ${arr[1]}`
	format_no3=`printf '%-4s' ${arr[2]}`
	format_no4=`printf '%-4s' ${arr[3]}`

	text_no1="${text_no1} | ${format_no1}" 
	text_no2="${text_no2} | ${format_no2}" 
	text_no3="${text_no3} | ${format_no3}" 
	text_no4="${text_no4} | ${format_no4}" 

	percentage=`echo "scale=2; (${arr[1]} - ${arr[2]}) / ${arr[1]}" | bc`
	percentage=`awk "BEGIN {print ${percentage} * 100}"`
	percentage=`printf '%-4s' ${percentage}%`

	text_no5="${text_no5} | ${percentage}" 


	format_no6=`printf '%-4s' ${arr[4]}`
	format_no7=`printf '%-4s' ${arr[5]}`
	text_no6="${text_no6} | ${format_no6}" 
	text_no7="${text_no7} | ${format_no7}" 

	if [ ${#arr[@]} -eq 8 ]; then
		is_new=true

		format_no8=`printf '%-4s' ${arr[6]}`
		format_no9=`printf '%-4s' ${arr[7]}`
		text_no8="${text_no8} | ${format_no8}" 
		text_no9="${text_no9} | ${format_no9}" 
	fi

done < $1

column=`echo $(( ${column_count} + 1 ))| awk '{for(i=1;i<=$1;i++)x=x"| ---: ";print x}'`

{
	echo "${text_no1} |"
	echo "${column}|"
	echo "${text_no2} |" 
	echo "${text_no3} |" 
	echo "${text_no4} |" 
	echo "${text_no5} |" 
	echo "${text_no6} |" 
	echo "${text_no7} |" 
}

if "${is_new}"; then
	{
		echo "${text_no8} |" 
		echo "${text_no9} |" 
	}
fi
