
JS_JSX_PATTERN = /\.(js|jsx)$/i;

function constructor(instance){
    parent = instance.constructor.toString().split(" ")[1].slice(0,-2);
    return parent;
}

function getFiles(folder,subFolders){
    
    fetchedFiles = [];

    subFolders = subFolders || true;
    
    var files = folder.getFiles();
    
    for(i=0;i<files.length;i++){
        
        if(files[i] instanceof File){
                
            if(files[i].fullName.search(JS_JSX_PATTERN) != -1){
                fetchedFiles.push(files[i]);
            } 
        
        }else if(files[i] instanceof Folder){
        
            if(subFolders) getFiles(files[i],subFolders);
        
        }  
    }
    return fetchedFiles;
}

function include(list,allSubFolders){
    
    incFiles = [];
    
    for(var i=0;i<list.length;i++){
        s = list[i];
        if(typeof s != "string"){
            throw new Error("File or directory name must be a string.");
        }
        if(s.search(JS_JSX_PATTERN) != -1){
            
            file = File(s);
            if(!file.exists) throw Error("File: "+s+" does not exist.");
            incFiles.push(file);
        
        }else if(s.search(/\/$/) != -1){

            folder = Folder(s);
            if(!folder.exists) throw Error("Folder: "+s+"does not exist.");
            fetchedFiles = getFiles(folder,allSubFolders);
            incFiles.push(fetchedFiles[0],fetchedFiles[1]);          

        }else{
            throw new Error("File or folder name invalid");
        }
        
    }
    alert(incFiles);
    for(i=0;i<incFiles.length;i++) {
        
        //$.evalFile(incFiles[i]);
    }

}