#!/bin/bash

# June 10th, 2019
# Joshua M. Moore

# This script sets up emsdk on my operating system. 

# Thanks to https://unix.stackexchange.com/questions/194047/splitting-the-working-directory-in-a-bash-script
PROJECT_NAME='fourd.cpp.js'
if [ $(basename `pwd`) != "fourd.cpp.js" ]; then
  echo "Please run this script from the project's base directory, so I can know what I'm doing..."
  exit 1
fi

# Add git submodule emsdk under tools/emsdk
# I expect the git command to abort instead of overwriting the directory. 
git submodule submodule add https://github.com/emscripten-core/emsdk.git tools/emsdk


