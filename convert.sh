#!/bin/bash
notify-send "converting"
FILE1=$1
mogrify -negate -format png $FILE1 
rm $FILE1


