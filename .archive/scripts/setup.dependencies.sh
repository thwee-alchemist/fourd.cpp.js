#!/bin/bash

# June 10th, 2019
# Joshua M. Moore

force_flag=''

print_usage(){
  echo "Usage: "
  echo "$ cd fourd.cpp.js"
  echo "$ ./scripts/setup.compiler.sh [-f]"
}

while getopts 'f' flag; do
  case "${flag}" in
    a) force_flag='true' ;;
    *) print_usage
       exit 1 ;;
  esac
done

# Thanks to https://unix.stackexchange.com/questions/194047/splitting-the-working-directory-in-a-bash-script
PROJECT_NAME='fourd.cpp.js'
if [ $(basename `pwd`) != "fourd.cpp.js" ]; then
  echo "Please run this script from the project's base directory, so I can know what I'm doing..."
  exit 1
fi

PROJECT_DIR=`pwd`

scons -v
if [ $? -ne 0 ]; then
  sudo yum install -y scons
fi

git clone https://github.com/imvu/gmtl.git src/gmtl
if [ $? -eq 0 ]; then
  cd src/gtml
  sudo scons install
fi

cd $PROJECT_DIR
echo `pwd`
