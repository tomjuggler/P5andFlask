#!/bin/bash
notify-send "converting"
FILE1=$1
mogrify -negate -format jpg $FILE1 
rm $FILE1


