#!/bin/bash
rm -rf build/
# Install dependencies and compile ts code
npm run build
nohup node server.js > /dev/null &
