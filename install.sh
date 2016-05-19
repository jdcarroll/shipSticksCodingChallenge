#!/bin/bash
# Code Challenge install script
# importing data from json array to mongodb
echo 'Importing data into mongodb'
mongoimport --jsonArray --db ShipSticks --collection products --file products.json

# verifying that bower is installed
command -v bower >/dev/null 2>&1 || { 

	echo "Installing bower " >&2; 

	npm install -g bower

}
# verifying that gulp is installed
command -v gulp >/dev/null 2>&1 || { 

	echo "Installing gulp " >&2; 

	npm install -g gulp

}
# installing node dependancies
echo ''
echo 'installing node dependancys'
echo ''
npm install
# installing bower dependancies
echo ''
echo 'installing bower dependancys'
echo ''
bower install 

# run gulp
gulp &

echo 'Launching App: at localhost:3000'

open "http://localhost:3000"