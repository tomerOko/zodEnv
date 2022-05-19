# documentation for this package DEVELOPMENT
## requiremnts
the project needs bash and docker. so run one of the options below: 
  - Linux machine  
  - mack os  
  - WSL (go for v2)
- kubernetes anbeled (i used docker desktop)  


<br>

## run it
0. clone it
1. cd into the path u cloned to
2. cd into the scripts folder
3. run `bash run_dev.sh`  
  a. u can add `-p <number>` for custom port (defult to 3000)   
  b. u can add `-i <image name>` for custom image name (defult to 'run_ts_image')  
  c. u can add `-i <container name>` for custom container name (defult to 'run_ts_container')  
  d. u can add `no-build` to not rebuild (build anyway if the image not exist)
4. u will be asked for sudo permissions - explained at the bottom of the file (*1)
5. while developing there are two options  
    a. edit normally, run commands inside the container through `docker exec`` \ `kubectl exec`. and watch logs through `docker logs` \ `kubectl logs`.  
    b. 'Remote - Containers' (for VS code) or 'JetBrains Projector' / 'JetBrains Gateway' for webstorm (havent tried them)


<br>

## adding new npm packages  
  it is a best practice to install pakcages from withing the container, some of the have different binaries for different OS's


<br>

## test
1. cd into scripts folder
2. run `bash run_test.sh` (same optional parameters as the run_dev script)
3. u will be asked for sudo permissions - explained at the bottom of the file (*1)


<br>

## debug
a 'lunch.json' file is existed for VS code.  
probably wont be two hurd to


<br>

## build
1. cd into scripts folder
2. run `bash build_for_prod.sh` 
3. the js files will be at \<root directory>/out







<br>
<br>
<br>
<br>
<br>

## comments

### *(*1)*
sudo permissions are needed for 2 resons  
    1. to change files while creating images  
    2. if u running WSL the OS that run's the code editor is WINDOWS but the files are stored on the LINUX file system. so windows need permmmisions to change the file's  
    \* if u running on mac/linux try to remove the sudo from the scripts it might work