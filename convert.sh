#!/bin/bash

FILE1=$1
mogrify -format jpg $FILE1 
rm $FILE1


