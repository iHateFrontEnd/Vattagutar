#!/bin/sh

cd client
rm -rf node_modules package-lock.json

cd ../server/express
rm -rf node_modules package-lock.json

cd ../socketio
rm -rf node_modules package-lock.json

cd ../../start-app
rm -rf node_modules package-lock.json

cd ../

./installer.sh
