#include "../lib/indexGetter.jsx";
#include "array.jsx";

PropertyGroup.prototype.moveFirstVertex = function(index){
    
    const ERR_MSG_SELECTED_PROP_INVALID = "Can't move first vertex.\n"
    +"The selected property is not a shape layer group"
    +"a path group, nor is it a path";

    const MATCH_NAMES = {
        group: "ADBE Vector Group",
        pathGroup: "ADBE Vector Shape - Group",
        path: "ADBE Vector Shape",
    };

    var indexGetter = new IndexGetter();
  
    switch (this.matchName) {
        case MATCH_NAMES.group:
            for(var i=1;i<this.numProperties+1;i++){
                if(this.property(i).matchName == MATCH_NAMES.pathGroup){
                    foundPath = this.property(i).path;
                    this.mFirstVertex(foundPath,index,indexGetter);
                }
            }
            break;
        case MATCH_NAMES.pathGroup:
            this.mFirstVertex(this.path,index,indexGetter);
            break;   
        case MATCH_NAMES.path:
            this.mFirstVertex(this,index,indexGetter);
            break;
        default:
            alert(ERR_MSG_SELECTED_PROP_INVALID);
            break;
    }
}

PropertyGroup.prototype.mFirstVertex = function(path,index,indexGetter){
    
    if(index == "Default"){
      return;
    }
    
    pathValue = path.value;
    vert = pathValue.vertices;
    intan = pathValue.inTangents;
    outtan = pathValue.outTangents;
    isClosed = pathValue.closed;
    
    shape = new Shape();
    direc = "";
    num = 0;

    try{
    index = indexGetter.getIndex(vert,index);
    }catch(e){
      if(e instanceof IndexError){
        alert(e.toString());
      }else{
        alert("UNKNOWN INDEXGETTER ERROR");
      }
    }
       
    midpoint = parseInt(vert.length/2);
    if(index < midpoint){
      direc = "LEFT";
      num = index;
    }else{
      direc = "RIGHT";
      num = vert.length - index;
    }

    shape.vertices = vert.rotate(direc,num);
    shape.inTangents = intan.rotate(direc,num);
    shape.outTangents = outtan.rotate(direc,num);
    shape.closed = isClosed;

    keyTime = path.getRightKeyTime(); 
    if( keyTime == false ){
      path.setValue(shape);
    }else{
      path.setValueAtTime(keyTime,shape);
    }
}

PropertyGroup.prototype.getRightKeyTime = function (){
  
  compTime = app.project.activeItem.time;

  if(this.matchName != "ADBE Vector Shape"){
    throw new TypeError("getRightKeyTime is only for path property.");
  }
  
  if(!this.numKeys) return false;
  
  nearestKeyIndex = this.nearestKeyIndex(compTime);
  nearestKeyIndexTime = this.keyTime(nearestKeyIndex);
  
  if(nearestKeyIndexTime > compTime){
    if(nearestKeyIndex == 1){
      return false;
    }
    rightKey = nearestKeyIndex - 1;
  }
  
  else{
    rightKey = nearestKeyIndex;
  }

  rightKeyTime = this.keyTime(rightKey);
  return rightKeyTime;
}