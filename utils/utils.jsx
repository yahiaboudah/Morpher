Array.prototype.contains = function(element){
    for(i=0;i<this.length;i++){
        if(this[i] == element){
            return true;
        }
    }
    return false;
}

function constructor(instance){
    parent = instance.constructor.toString().split(" ")[1].slice(0,-2);
    return parent;
}

function getFiles(dirPath,extensions,subFolders){
    
    fetchedFiles = [];
    
    // Handle different cases:
    if(typeof dirPath == "undefined") return [];
    else{
        if(constructor(dirPath) != "String") throw Error("Invalid dirPath")
    }
    if(typeof extensions == "undefined") extensions = ['*'];
    else{
        if(constructor(extensions) != "Array") throw Error("Invalid Extensions");
    }
    subFolders = subFolders || true;

    
    var files = Folder(dirPath).getFiles();
    
    for(i=0;i<files.length;i++){
        if(files[i] instanceof File){
            
            if(extensions[0] == '*'){

                fetchedFiles.push(files[i].name);

            }else{
                extension = files[i].absoluteURI.split(".")[1];
                if(extensions.contains(extension)){
                    fetchedFiles.push(files[i].name);
                }
        }
        }else if(files[i] instanceof Folder){
            if(subFolders){
                getFiles(files[i].absoluteURI,extensions);
            }
        }else continue;
    }
    return fetchedFiles;
}

files = getFiles("C:/Users/HP/Desktop/testFolder/");
alert(files);

function include(list){

    includedFiles = [];
    
    for(var i=0;i<list.length;i++){
        if(typeof list[i] != "string"){
            throw new Error("File or directory name must be a string.");
        }
        if(s.substring(0,-3) == "jsx"){

            includedFiles.push(list[i]);
        
        }else if(s.substring(0,-1) == ("\/")){


        }else{
            throw new Error("File or directory name invalid");
        }
        
    }

    for(i=0;i<includedFiles.length;i++){
        $.evalFile(includedFiles[i]);
    }
}


