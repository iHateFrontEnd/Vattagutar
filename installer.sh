#!/bin/sh
cd server/express
npm install

cd ../socketio
npm install

cd ../../client
npm install --force

cd ../start-app
npm install

cd ..

chmod +x ./startMe.sh

echo "\n ### EVERYTHING IS INSTALLED, TO START THE APP RUN: ./startMe.sh ###"
