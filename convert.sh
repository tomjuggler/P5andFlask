#!/bin/bash
notify-send "converting"
FILE1=$1
mogrify -transparent-color red -transparent red -negate -format png $FILE1 
#mogrify -transparent-color cyan -transparent cyan $FILE1
rm $FILE1


