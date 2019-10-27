//@include "../../Logger/logger.jsx";

logger = new Logger({
    loggerName: "newLogger",
    enabled: false
});

function constructor(instance){
    parent = instance.constructor.toString().split(" ")[1].slice(0,-2);
    return parent;
}


function getFiles(folderPath,mask){

    O = {
        fileQueue: [],
        folderQueue: [],
        fileType: "File",
        folderType: "Folder",
        getF: function(dirPath,type){
                finalArray = [];
                var folder = Folder(dirPath);
                var files = folder.getFiles();
                for(i=0;i<files.length;i++){
                    switch (type) {
                        case "Folder":
                            if(files[i] instanceof Folder){
                                finalArray.push(files[i]);
                            }
                            break;
                        case "File":
                                if(files[i] instanceof File){
                                    if(mask == undefined) {
                                        finalArray.push(files[i]);
                                    }else{
                                        if(files[i].fullName.search(mask) != -1){
                                            finalArray.push(files[i]);
                                        }
                                    }
                                }
                            break;        
                        default:
                            break;
                    }
                }
                return finalArray;
        }
    };
    
    var files = O.getF(folderPath,O.fileType);
    Array.prototype.push.apply(O.fileQueue,files);

    O.folderQueue = O.getF(folderPath,O.folderType);
    
    while(O.folderQueue.length > 0){
        folderNow = O.folderQueue.pop();
        
        filesInFolder = O.getF(folderNow,O.fileType);
        Array.prototype.push.apply(O.fileQueue,filesInFolder);
        
        foldersInFolder = O.getF(folderNow,O.folderType);
        Array.prototype.push.apply(O.folderQueue,foldersInFolder);
    }

    return O.fileQueue;

}


function include(list){

    O = {
        JS_JSX_PATTERN : /\.(js|jsx)$/i,
        incFiles :[]
    }

    for(var i=0;i<list.length;i++){
        s = list[i];
        if(typeof s != "string"){
            throw new Error("File or directory name must be a string.");
        }
        if(s.search(O.JS_JSX_PATTERN) != -1){
            
            file = File(s);
            if(!file.exists) throw Error("File: "+s+" does not exist.");
            O.incFiles.push(file);
            
        }else if(s.search(/\/$/) != -1){

            folder = Folder(s);
            if(!folder.exists) throw Error("Folder: "+s+"does not exist.");
            allFilesInFolder = getFiles(folder,O.JS_JSX_PATTERN);
            Array.prototype.push.apply(O.incFiles,allFilesInFolder);
            
        }else{
            throw new Error("File or folder name invalid");
        }
        
    }
    
    alert(O.incFiles.length);
    for(i=0;i<O.incFiles.length;i++) {
        $.evalFile(incFiles[i]);
    }

}

include([
    "../test5/"
]);




