#!/bin/sh
# !!! if u have any http request level test, make sure the port is right 

# look for arguments
for var in "$@"
do
    case "${var}" in
        no-build) noBuild="no-build";;
        watch) watch="-watch";;
    esac
done

# r: run command   i: image name   c: container name   p: port 
/bin/bash ./run.sh -r "npm i && npm run test$watch" -c package_template_test_container -i package_template_image -p 3001 $noBuild