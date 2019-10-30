//@include "../utils/utils.jsx";

morphing = {

    CONSTANTS: {
    
        SORTING_DIRECTIONS : {
        topLeft: "TOPLEFT",
        leftRight: "LEFTRIGHT",
        rightLeft : "RIGHTLEFT",
        bottomUp: "BOTTOMUP",
        topDown: "TOPDOWN"    
        },
    
        DUPLICATES_OPTS : {
        closestShapes : "CLOSEST SHAPES",
        random : "RANDOM",
        centerOfMass: "CENTER OF MASS",
        manual : "MANUAL"
        },
    
        LAYERS_SHRINK_OPTS : {
        deleteOpt : "Delete",
        disbaleOpt : "Disable",
        noneOpt : "No"
        },
    
        LAYERS_EXPAND_OPTS : {
        restoreOpt : "Restore",
        keepOpt : "Keep",
        noneOpt : "No"
        },
    
        MORPH_TYPE : {
        EXPANDING: "EXPANDING",
        SHRINKING: "SHRINKING"
        },
    
        FIRST_VERTEX_OPTS : {
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
        }
    }
    
};

include([
    "polyfills/",
    "lib/indexGetter.jsx"
]);

function Morpher(config, morphOnCreate){

    config = config || {};
    morphOnCreate = morphOnCreate || false;

    this.preMorphLayer = config.premorphLayer || undefined;
    this.postMorphLayer = config.postMorphLayer || undefined;
    this.premorphSortingDirection = config.premorphSortingDirection || morphing.CONSTANTS.SORTING_DIRECTIONS.topLeft;
    this.postMorphSortingDirection = config.postMorphSortingDirection || morphing.CONSTANTS.SORTING_DIRECTIONS.topLeft;
    this.premorphFVertex = config.premorphFVertex || morphing.CONSTANTS.FIRST_VERTEX_OPTS.upperLeft;
    this.postmorphFVertex = config.postmorphFVertex || morphing.CONSTANTS.FIRST_VERTEX_OPTS.upperLeft;
    this.duplicates = config.duplicates || morphing.CONSTANTS.DUPLICATES_OPTS.closestShapes;
    this.layersShrink = config.layersShrink || morphing.CONSTANTS.LAYERS_SHRINK_OPTS.deleteOpt;
    this.layersExpand = config.layersExpand || morphing.CONSTANTS.LAYERS_EXPAND_OPTS.restoreOpt;
    this.morphTime = config.morphTime || 0.5;

    if(morphOnCreate) this.morph();

}

Morpher.prototype.indexGetter = new IndexGetter();


Morpher.prototype.getDistances = function(layer,startingPoint,selectedLayerName){
    
    const errMsg = {
        selectedLayer : "No selected layer name provided.",
        invalidSortingDirection : "The provided sorting direction is invalid."
    };

    comp = app.project.activeItem;

    distances = [];
    
    contents = layer.property("Contents");
    
    src = layer.sourceRectAtTime(comp.time,false);
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

Morpher.prototype.getDiff = function (){
    var premorphNumProps = this.preMorphLayer.property("Contents").numProperties;
    var postmorphNumProps = this.postMorphLayer.property("Contents").numProperties;
    return postmorphNumProps - premorphNumProps;
}

Morpher.prototype.duplicateGroup = function (layer,prop){
    layer.property("Contents").property(prop).duplicate();
}


Morpher.prototype.morph = function(){
  
  var compTime = app.project.activeItem.time;
  // fvertex
  this.preMorphLayer.moveFirstVertex(this.premorphFVertex);
  this.postMorphLayer.moveFirstVertex(this.postmorphFVertex);


  switch (this.duplicates) {
      case this.DUPLICATES_OPTS.closestShapes:

          break;
      case this.DUPLICATES_OPTS.centerOfMass:

          break;
      case this.DUPLICATES_OPTS.random:

          break;
      case this.DUPLICATES_OPTS.manual:
          
          break;    
      default:
          alert("Passed value is not included in the duplicates options list.");
          return;
  }

  diff = this.getDiff();
  
  if(diff > 0){
    // Expand:
    //var eachGets = diff / this.preMorphLayer.property("Contents").numProperties;  
    for(var i=0;i<diff;i++){
      this.duplicateGroup(this.preMorphLayer,1);
    }    

  }else if(diff < 0){
    // Shrink:
    for(var i=0;i<diff;i++){
        this.duplicateGroup(this.postMorphLayer,1);
    }

  }

  // Get distaces from SORTING_DIRECTION:
  premorphDistances = this.getDistances(this.preMorphLayer,this.premorphSortingDirection);
  postmorphDistances = this.getDistances(this.postMorphLayer,this.postMorphSortingDirection);
  // Sort indices based on the distances:
  // Get the list of indicies to start morphing:
  preMorphIndices = this.indexGetter.sortIndices(premorphDistances);
  postMorphIndices = this.indexGetter.sortIndices(postmorphDistances);
  
  // loop through all properties:
  for(var j=1;j<this.preMorphLayer.property("Contents").numProperties+1;j++){

    // Get the right groups:
    var group = this.preMorphLayer.property("Contents").property(preMorphIndices[j-1]);
    var otherGroup = this.postMorphLayer.property("Contents").property(postMorphIndices[j-1]);

    // Get the right path prop index:
    var num = getPathProp(group);
    var otherNum = getPathProp(otherGroup);
   

    // ------------ GET ------------ //
    // PATH:
    var pathProp = group.property("Contents").property(num).path;
    var otherPathProp = otherGroup.property("Contents").property(otherNum).path;
    // POS:
    var thisPos = group.property("Transform").property("Position");
    var otherPos = otherGroup.property("Transform").property("Position");

    // ----------- SET ------------//
    // PATH:
    pathProp.setValueAtTime(compTime,pathProp.value);
    pathProp.setValueAtTime(compTime+s.morphTime,otherPathProp.value);
    // POS:
    thisPos.setValueAtTime(compTime,thisPos.value);
    thisPos.setValueAtTime(compTime+s.morphTime,otherPos.value);
}
}
