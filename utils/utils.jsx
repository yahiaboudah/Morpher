

time = {
    start : 0,
    end : 0,
    reset: function(){
        this.start = 0;
        this.end = 0;
    },
    start: function(){
        this.start = new Date().getTime();
    },
    end: function(msg){
        if(msg == undefined) msg = "";
        else msg = msg +": ";
        this.end = new Date().getTime();
        alert(msg + (this.end - this.start));
        this.reset();
    }
};

function objToString (obj) {
    var str = '';
    if(obj == undefined) return;
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + String(obj[p]) + '\n';
        }
      }
    return str;
}

function deepclone(arr){
    if(!(arr instanceof Array)) throw Error("deepclone only works on arrays");
    return eval("["+arr.toString()+"]");
}

function constructor(instance){
    return instance.constructor.toString().split(" ")[1].slice(0,-2);
}

function getFiles(folderPath,mask){

    O = {
        
        fileQueue: [],
        folderQueue: [],

        getF: function(dirPath){
                
            obj = {
                files: [],
                folders: []
            };
                
            var folder = Folder(dirPath);
            var files = folder.getFiles();
                
            for(i=0;i<files.length;i++){
                    
                if(files[i] instanceof Folder){
                    obj.folders.push(files[i]);
                }
                    
                else if(files[i] instanceof File){
                    if(mask == undefined) {
                        obj.files.push(files[i]);
                    }else{
                        if(files[i].fullName.search(mask) != -1){
                            obj.files.push(files[i]);
                        }
                    }
                }
            }
            return obj;
        }
    };
    
    var fs = O.getF(folderPath);
    
    O.folderQueue = fs.folders;
    Array.prototype.push.apply(O.fileQueue,fs.files);
    
    while(O.folderQueue.length){

        folderNow = O.folderQueue.pop();
        fs = O.getF(folderNow);

        Array.prototype.push.apply(O.fileQueue,fs.files);
        Array.prototype.push.apply(O.folderQueue,fs.folders);
    
    }

    return O.fileQueue;

}

function include(list){

    INC = {
        JS_JSX_PATTERN : /\.(js|jsx)$/i,
        incFiles :[]
    }

    for(var i=0;i<list.length;i++){
        s = list[i];
        if(typeof s != "string"){
            throw new Error("File or directory name must be a string.");
        }
        if(s.search(INC.JS_JSX_PATTERN) != -1){
            
            file = File(s);
            if(!file.exists) throw Error("File: "+s+" does not exist.");
            INC.incFiles.push(file);
            
        }else if(s.search(/\/$/) != -1){

            folder = Folder(s);
            if(!folder.exists) throw Error("Folder: "+s+"does not exist.");
            files = getFiles(folder,INC.JS_JSX_PATTERN);
            Array.prototype.push.apply(INC.incFiles,files);

        }else{
            throw new Error("File or folder name invalid");
        }
        
    }
    
    for(i=0;i<INC.incFiles.length;i++) {
        $.evalFile(INC.incFiles[i]);
    }

}

