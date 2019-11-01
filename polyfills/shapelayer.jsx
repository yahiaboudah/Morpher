#include "propertygroup.jsx";


ShapeLayer.prototype.area = function(){
    comp = app.project.activeItem;
    src = this.sourceRectAtTime(comp.time,false);
    sc = this.transform.scale.value;
    width = src.width * sc[0] / 100;
    height = src.height * sc[1] / 100;
    return width * height;
}

ShapeLayer.prototype.moveFirstVertex = function(index){
    for(var i=1;i<this.property("Contents").numProperties+1;i++){
       this.property(i).moveFirstVertex(index);
    }
}

ShapeLayer.prototype.alpha = function(){
    expression = "src = thisLayer.sourceRectAtTime();\n"
    +"sc = transform.scale;\n"
    +"w = sc[0]*src.width/200;\n"
    +"h = sc[1]*src.height/200;\n"
    +"pos = [toWorld([src.left,0])[0]+w,toWorld([0,src.top])[1]+h];\n"
    +"thisLayer.sampleImage(pos,[w,h]);";
    colorProp = this.property("Effects").addProperty("Color Control");
    colorPropp = colorProp.property("Color");
    colorPropp.expression = expression;
    alphaVal = colorPropp.value;
    colorProp.remove();
    return alphaVal[3];
}

ShapeLayer.prototype.getGroupAreas = function(){
    areas = [];
    visibilityArr = [];
    contents = this.property("Contents");
    
    for(var i=1;i<contents.numProperties+1;i++){
        visibilityArr[visibilityArr.length] = contents.property(i).enabled; 
        contents.property(i).enabled = false;
    }
    
    for(var i=1;i<contents.numProperties+1;i++){
        if(i>1){
        contents.property(i-1).enabled = false;
        }
        contents.property(i).enabled = true;
        area = this.area(this);
        alpha = this.alpha(this);
        areas[areas.length] = area * alpha;
    }
    
    for(var i=1;i<contents.numProperties+1;i++){
        contents.property(i).enabled = visibilityArr[i-1];
    }

    return areas;
}

ShapeLayer.prototype.getDistances = function(){
    
    const errMsg = {
        selectedLayer : "No selected layer name provided.",
        invalidSortingDirection : "The provided sorting direction is invalid."
    };

    comp = app.project.activeItem;

    distances = [];
    
    contents = this.property("Contents");
    
    src = this.sourceRectAtTime(comp.time,false);
    WIDTH = src.width;
    HEIGHT = src.height; 
    
    for(var i=1;i<contents.numProperties+1;i++){
      
        pos = contents.property(i).property("Transform").property("Position").value;
      
        switch (startingPoint) {
       
            case morphing.CONSTANTS.SORTING_DIRECTIONS.topleft:
               dist = Math.sqrt(Math.pow((pos[0]-src.left),2)+Math.pow((pos[1]-src.top),2));
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.leftRight:
               dist = pos[0]-src.left;
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.rightLeft:
               dist = WIDTH - (pos[0]-src.left);
               break;   
            case morphing.CONSTANTS.SORTING_DIRECTIONS.topdown:
               dist = pos[1] - src.top;
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.bottomUp:
               dist = HEIGHT - (pos[1] - src.top)
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.closestTo:
               if(typeof selectedLayerName != "undefined"){
                    selectedLayer = comp.layers.byName(selectedLayerName);
                    selLayerPos = selectedLayer.transform.position;
                    // TODO: Figure out the position coordinates of the
                    // elements relative to the comp coordinate system.
                    // Then simply subtract the distances to figure which
                    // ones are closer than others.
                }else{
                    alert(errMsg.selectedLayer);
                }  
            default:
                alert(errMsg.invalidSortingDirection);
                break;
      }
      distances[distances.length] = dist;
    }
    return distances;

}


