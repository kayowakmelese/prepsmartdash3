#!/bin/bash
rm -rf build/
# Build app
npm run build
nohup node server.js > /dev/null &
