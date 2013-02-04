#!/bin/sh


cd $1

touch index.html
mkdir css
mkdir less
mkdir js
mkdir img
touch less/style.less
touch less/mixin.less
touch less/variables.less
touch less/global.less
curl http://code.jquery.com/jquery-1.9.0.min.js -o js/jquery-1.9.0.min.js
