#!/bin/bash
# Code Challenge install script

echo 'Importing data into mongodb'
mongoimport --jsonArray --db ShipSticks --collection products --file products.json

command -v bower >/dev/null 2>&1 || { 

	echo "Installing bower " >&2; 

	npm install bower

}
command -v gulp >/dev/null 2>&1 || { 

	echo "Installing gulp " >&2; 

	npm install gulp

}
echo ''
echo 'installing node dependancys'
echo ''
npm install

echo ''
echo 'installing bower dependancys'
echo ''
bower install 

gulp &

echo 'Launching App: at localhost:3000'

open "http://localhost:3000"