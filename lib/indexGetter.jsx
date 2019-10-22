function IndexGetter(){}

function IndexError(){
    
    const ERR_MSG_INDEXPOS_INVALID = "The passed index position value is invalid\n"
    +"The valid index positions are:\n";
    +"An integer within the array's length, UP,LEFT,RIGHT,DOWN,UPPERLEFT,UPPERRIGHT,BOTTOMLEFT,BOTTOMRIGHT";
    
    this.message = ERR_MSG_INDEXPOS_INVALID;
    this.name = "IndexError";
    this.toString = function(){
        return this.name + ": "+this.errorMsg;
    }
}

IndexGetter.prototype.INDEX_POS = {
    up: "UP",
    left: "LEFT",
    right: "RIGHT",
    down: "DOWN",
    upperLeft: "UPPERLEFT",
    upperRight : "UPPERRIGHT",
    bottomLeft: "BOTTOMLEFT",
    bottomRight: "BOTTOMRIGHT",
    random : "RANDOM",
    closestTo : "CLOSEST TO"
};

IndexGetter.prototype.getIndex = function(passedArr,indexPos){

    arr = JSON.parse(JSON.stringify(passedArr))
    
    switch (indexPos) {
        case this.INDEX_POS.up:
            return this.upIndex(arr);
        case this.INDEX_POS.down:
            return this.downIndex(arr);
        case this.INDEX_POS.left:
            return this.leftIndex(arr);  
        case this.INDEX_POS.right:
            return this.rightIndex(arr);
        case this.INDEX_POS.upperLeft:
            return this.upperLeftIndex(arr);
        case this.INDEX_POS.upperRight:
            return this.upperRightIndex(arr);
        case this.INDEX_POS.bottomRight:
            return this.bottomRightIndex(arr);
        case this.INDEX_POS.bottomLeft:
            return this.bottomLeftIndex(arr);
        case this.INDEX_POS.random: 
            return 0;
        case this.INDEX_POS.closestTo:
            return 0;                                
        default:
            if(indexPos == parseInt(indexPos)){
                if(indexPos < 0 || indexPos > arr.length){
                    throw new RangeError("Index out of range.");
                }else{
                    return indexPos;
                }
            }else{
                throw new IndexError();
            }
    }
}

IndexGetter.prototype.sortIndices = function(list){
  var result = [];
  for(var i = 0; i < list.length; i++) result[i] = i;
  result = result.sort(function(u,v) { return list[u] - list[v]; });
  for(var i = 0; i < result.length; i++) result[i] += 1;
  return result;
}

IndexGetter.prototype.getMin = function(arr,minWhere){
    switch (minWhere) {
        case 'x':
          return arr.reduce(function(a, b) {
                return [Math.min(a[0], b[0]),0];
                })[0];         
        case 'y':
          return arr.reduce(function(a, b) {
                return [0,Math.min(a[1], b[1])];
                })[1];         
        default:
            alert("Min value can be x or y");
            break;
    }
}

IndexGetter.prototype.getMax = function(arr,maxWhere){
    switch (maxWhere) {
        case 'x':
          return arr.reduce(function(a, b) {
                return [Math.max(a[0], b[0]),0];
                })[0];         
        case 'y':
          return arr.reduce(function(a, b) {
                return [0,Math.max(a[1], b[1])];
                })[1];         
        default:
            alert("Max value can be x or y");
            break;
    }
}

IndexGetter.prototype.upIndex = function(list){
    maxy = this.getMax(list,'y');
    return list.indexOf(maxy);
}

IndexGetter.prototype.downIndex = function(list){
   miny = this.getMin(list,'y');
   return list.indexOf(miny); 
}

IndexGetter.prototype.leftIndex = function(list){
    minx = this.getMin(list,'x');
    return list.indexOf(minx);
}

IndexGetter.prototype.rightIndex = function(list){
    maxx = this.getMax(list,'x');
    return list.indexOf(maxx);
}

IndexGetter.prototype.upperLeftIndex = function(list){
        
    minx = this.getMin(list,'x');
    miny = this.getMin(list,'y');
    
    list = list.map(function(x){
        return Math.sqrt(Math.pow(x[0]-minx,2)+Math.pow(x[1]-miny,2));
    });

    minim = Math.min.apply(null,dists);
    
    return list.indexOf(minim);
}

IndexGetter.prototype.upperRightIndex = function(list){
    
    return 0;

}

IndexGetter.prototype.bottomLeftIndex = function(list){

    return 0;

}

IndexGetter.prototype.bottomRightIndex = function(list){
    maxx = this.getMax(list,'x');
    maxy = this.getMax(list,'y');

    list = list.map(function(x){
        return Math.sqrt(Math.pow(x[0]-minx,2)+Math.pow(x[1]-miny,2));
    });

    maxim = Math.max.apply(null,dists);
    
    return list.indexOf(maxim);
}
