#include "../json2.js";
#include "UI/morphUI.jsx";
#targetengine beforeMorph, afterMorph
beforeMorph = [];
afterMorph = [];


win.center();
win.show();


// functions:
function getSelectedShapeLayers(){
  var comp = app.project.activeItem;
  if(!comp || !(comp instanceof CompItem)){
    alert("select a composition");
    return;
  }
  if(comp.selectedLayers.length == 0){
    alert("Select some layers");
    return;
  }else{
    for(var i=0;i<comp.selectedLayers.length;i++){
      if(comp.selectedLayers[i] instanceof ShapeLayer){
        continue;
      }else{
        alert("Select only shape layers");
        return;
      }
    }
    return comp.selectedLayers;
  }
}

function getPathProp(group){
  //var indicies = [];
  var index = 0;
  for(var i=1;i<group.property("Contents").numProperties+1;i++){
    var x = group.property("Contents").property(i);
    if(x.name.indexOf("Path") != -1){
      index = i;
      break;
      //indicies[indicies.length] = i;
    }
  }
  // return indicies;
  return index;
}

function getDiff(premorph,postmorph){
  var premorphNumProps = premorph.property("Contents").numProperties;
  var postmorphNumProps = postmorph.property("Contents").numProperties;
  var diff = postmorphNumProps - premorphNumProps;
  return diff;
}

function getDistances(layer,startingPoint,selectedLayerName){
  
  comp = app.project.activeItem;
  distances = [];
  contents = layer.property("Contents");
  src = layer.sourceRectAtTime(comp.time,false);
  WIDTH = src.width;
  HEIGHT = src.height; 
  for(var i=1;i<contents.numProperties+1;i++){
    pos = contents.property(i).property("Transform").property("Position").value;
    switch (startingPoint) {
      case "topleft":
        dist = Math.sqrt(Math.pow((pos[0]-src.left),2)+Math.pow((pos[1]-src.top),2));
        break;
      case "leftright":
        dist = pos[0]-src.left;
        break;
      case "rightleft":
        dist = WIDTH - (pos[0]-src.left);
        break;   
      case "topdown":
        dist = pos[1] - src.top;
        break;
      case "bottomup":
        dist = HEIGHT - (pos[1] - src.top)
        break;
      case "Closest To":
        if(selectedLayerName != null){
          selectedLayer = comp.layers.byName(selectedLayerName);
          selLayerPos = selectedLayer.transform.position;
          // TODO: Figure out the position coordinates of the
          // elements relative to the comp coordinate system.
          // Then simply subtract the distances to figure which
          // ones are closer than others.
        }else{
          alert("No layer name provided.");
        }  
      default:
        alert("Invalid sorting direction.");
        break;
    }
    distances[distances.length] = dist;
  }
  return distances;
}

function rotateArray(array,direction,i){
    arr = JSON.parse(JSON.stringify(array));
    if(direction == "RIGHT"){
      while(i){
        arr.unshift(arr.pop());
        i--;
      }
    }
    else if(direction == "LEFT"){
      while(i){
        arr.push(arr.shift());
        i--;
      }
    }
    else{
      alert("Direction is either LEFT or RIGHT");
    }
  return arr;
}

function moveFirstVertex(path,index,time){
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
  if(index == "UPPERLEFT"){
    index = upperLeftIndex(vert);
  }
  midpoint = parseInt(vert.length/2);
  if(index < midpoint){
    direc = "LEFT";
    num = index;
  }else{
    direc = "RIGHT";
    num = vert.length - index;
  }
  shape.vertices = rotateArray(vert,direc,num);
  shape.inTangents = rotateArray(intan,direc,num);
  shape.outTangents = rotateArray(outtan,direc,num);
  shape.closed = isClosed;
  if(time == false){
    path.setValue(shape);
  }else{
    path.setValueAtTime(time,shape);
  }
}

function upperLeftIndex(list){
  dists = [];
  // get minx and miny:
  minx = +Infinity;
  miny = +Infinity;
  for(var i=0;i<list.length;i++){
    if(list[i][0] < minx){
      minx = list[i][0];
    }
    if(list[i][1] < miny){
      miny = list[i][1];
    }
  }
  for(var i=0;i<list.length;i++) {
  dists[i] = Math.sqrt(Math.pow(list[i][0]-minx,2)+Math.pow(list[i][1]-miny,2));
  }

  for(var i=0;i<list.length;i++) {
  dists[i] = Math.sqrt(Math.pow(list[i][0]-minx,2)+Math.pow(list[i][1]-miny,2));
  }
  minim = Math.min.apply(null,dists);
  for (var i = 0; i < dists.length; i++) {
      if (dists[i] == minim) {
        return i;
      }
  }
}

function alpha(layer){
  expression = "src = thisLayer.sourceRectAtTime();\n"
  +"sc = transform.scale;\n"
  +"w = sc[0]*src.width/200;\n"
  +"h = sc[1]*src.height/200;\n"
  +"pos = [toWorld([src.left,0])[0]+w,toWorld([0,src.top])[1]+h];\n"
  +"thisLayer.sampleImage(pos,[w,h]);";
  colorProp = layer.property("Effects").addProperty("Color Control");
  colorPropp = colorProp.property("Color");
  colorPropp.expression = expression;
  alphaVal = colorPropp.value;
  colorProp.remove();
  return alphaVal[3];
}

function area(layer){
  comp = app.project.activeItem;
  src = layer.sourceRectAtTime(comp.time,false);
  sc = layer.transform.scale.value;
  width = src.width * sc[0] / 100;
  height = src.height * sc[1] / 100;
  return width * height;
}

function getAreas(layer,getAlpha,getRectangleArea){
  areas = [];
  contents = layer.property("Contents");
  // make everything invisible:
  for(var i=1;i<contents.numProperties+1;i++){
    contents.property(i).enabled = false;
  }
  // make visible one at a time:
  for(var i=1;i<contents.numProperties+1;i++){
    if(i>1){
      contents.property(i).enabled = false;
    }
    contents.property(i).enabled = true;
    area = getRectangleArea(layer);
    alpha = getAlpha(layer);
    areas[areas.length] = area * alpha;
  }
  return areas;
}

function centerOfMass(distances,areas){
  if(distances.length != areas.length){
    alert("Unequal length");
    return undefined;
  }else{
    xdistance = 0;
    ydistance = 0;
    len = areas.length;
    for(var i=0;i<distances.length;i++){
      xdistance += distances[i][0]*areas[i];
      ydistance += distances[i][1]*areas[i];
    }
    xdistance /= len;
    ydistance /= len;
    return [xdistance,ydistance];
  }
}

function sortIndices(list) {
  var result = [];
  for(var i = 0; i < list.length; i++) result[i] = i;
  result = result.sort(function(u,v) { return list[u] - list[v]; });
  for(var i = 0; i < result.length; i++) result[i] += 1;
  return result;
}

function getRightKeyTime(group,num,compTime){
  numKeys  = group.property("Contents").property(num).path.numKeys;
  if(numKeys == 0){
    return false;
  }
  nearestKeyIndex = group.property("Contents").property(num).path.nearestKeyIndex(compTime);
  nearestKeyIndexTime = group.property("Contents").property(num).path.keyTime(nearestKeyIndex);
  if(nearestKeyIndexTime > compTime){
    if(nearestKeyIndex == 1){
      return false;
    }
    rightKey = nearestKeyIndex - 1;
  }else{
    rightKey = nearestKeyIndex;
  }
  rightKeyTime = group.property("Contents").property(num).path.keyTime(rightKey);
  return rightKeyTime;
}


function duplicateGroup(layer,prop){
  layer.property("Contents").property(prop).duplicate();
}

function morph(s){
  // Get current comp time:
  var compTime = app.project.activeItem.time;
  
  // TODO: Deal with duplicates first:
  // Based on s.duplicates: Figure out how to even out
  // the number of groups across the two shape layers.
  //What groups to duplicate and how many times?
  // Basically: how to distribute the duplicates amongst
  // the layer with less groups.
  diff = getDiff(s.bMorph[0],s.aMorph[0]);
  if(diff > 0){
    // If the postmorph groups are greater than the premorph:
    // EXPANDING:
    // Duplication only in preMorphLayers, not postMorphLayers:
    // Duplicate the first group diff times:
    for(var i=0;i<diff;i++){
      duplicateGroup(s.bMorph[0],1);
    }    

  }else if(diff < 0){
    // If premoprh groups are greater than the postmorph:
    //SHRINKING:
    // Although this can be easily solved by duplicating 
    // the postMorph Layer Groups, this should be avoided.
    // the postMorphLayer must remain the same.


  }


  // Get distaces from SORTING_DIRECTION:
  premorphDistances = getDistances(s.bMorph[0],s.premorphSortingDirection);
  postmorphDistances = getDistances(s.aMorph[0],s.postmorphSortingDirection);
  // Sort indices based on the distances:
  morphedIndices = sortIndices(premorphDistances);
  morphedToIndices = sortIndices(postmorphDistances);  

  // loop through all properties:
  for(var j=1;j<s.bMorph[0].property("Contents").numProperties+1;j++){

    // Get the right groups:
    morphedIndex = morphedIndices[j-1];
    morphedToIndex = morphedToIndices[j-1];
    var group = s.bMorph[0].property("Contents").property(morphedIndex);
    var otherGroup = s.aMorph[0].property("Contents").property(morphedToIndex);

    // Get the right path prop index:
    var num = getPathProp(group);
    var otherNum = getPathProp(otherGroup);
   
    // Get the path props:
    var pathProp = group.property("Contents").property(num).path;
    var otherPathProp = otherGroup.property("Contents").property(otherNum).path;

    // Get pos properties:
    var thisPos = group.property("Transform").property("Position");
    var otherPos = otherGroup.property("Transform").property("Position");

    // Move first vertex:
    // Figure out the right key time if any:
    var preRightKeyTime = getRightKeyTime(group,num,compTime);
    moveFirstVertex(pathProp, s.premorphFVertex, preRightKeyTime);
    var postRightKeyTime = getRightKeyTime(otherGroup,otherNum,compTime);
    moveFirstVertex(otherPathProp,s.postmorphFVertex,postRightKeyTime);

    // Set the path value in that group:
    pathProp.setValueAtTime(compTime,pathProp.value);
    pathProp.setValueAtTime(compTime+s.morphTime,otherPathProp.value);
    
    // Set the pos value:
    thisPos.setValueAtTime(compTime,thisPos.value);
    thisPos.setValueAtTime(compTime+s.morphTime,otherPos.value);
}
}





// onclicks:
// Functionality on-clicks:

PRE_SELECTED = false;
POST_SELECTED = false;

function uiWhenGetSelected(){
  
  diff = getDiff(bMorph[0],aMorph[0]);
  if(diff > 0){ // EXPANDING:
    shrinkGroup.enabled = false;
    expandGroup.enabled = true;
  }else if(diff < 0){ //SHRINKING:
    shrinkGroup.enabled = true;
    expandGroup.enabled = false;
  }else{
    shrinkGroup.enabled = false;
    expandGroup.enabled = false;
  }
  if(premorphTabDefaultRadioButton.value && postmorphTabDefaultRadioButton.value && settingsTabDefaultRadioButton.value){
  // Make the morph button active, saves you a mouse click!
  morphButton.active = true;
  }

}


morphButton.onClick = function(){
  // config:
  config = {
    bMorph:beforeMorph,
    aMorph: afterMorph,
    premorphSortingDirection: premorphTabSortingDirectionPanelSortingList.selection.text,
    postmorphSortingDirection: postmorphTabSortingDirectionPanelSortingList.selection.text,
    premorphFVertex: premorphTabFirstVertexPanelFirstVertexList.selection.text,
    postmorphFVertex: postmorphTabFirstVertexPanelFirstVertexList.selection.text,
    duplicates: settingsTabDuplicatesPanelDistributeList.selection.text,
    layersShrink: [settingsTabLayersPanelRestoreRadioButton.value,settingsTabLayersPanelKeepRadioButton.value,settingsTabLayersPanelShrinkNoRadioButton.value],
    layersExpand: [settingsTabLayersPanelDeleteRadioButton.value,settingsTabLayersPanelDisableRadioButton.value,settingsTabLayersPanelExpandNoRadioButton.value],
    morphTime:parseFloat(settingsTabMorphingTimePanelEditText.text)
  };
  // Morph it!
  app.beginUndoGroup("Morph");
  morph(config);
  app.endUndoGroup();
}


premorphTabGetSelectedButton.onClick = function(){
  selLayers = getSelectedShapeLayers();
  if(selLayers == null){
    return;
  }else{
    PRE_SELECTED = true;
    beforeMorph = selLayers;
    // UI changes:
    selLayersNames = "";
    for(var i=0;i<selLayers.length;i++){
      selLayersNames += selLayers[i].name;
      if(i != selLayers.length - 1){
      selLayersNames += ",";}
    }
    premorphTabSelectedLayerName.text = selLayersNames;
  // UI changes:
  if(POST_SELECTED){
    uiWhenGetSelected();
  }else{
    if(premorphTabDefaultRadioButton.value){
    morpherTabbedPanel.selection = postmorphTab;
    }
  }
  }
}


postmorphTabGetSelectedButton.onClick = function(){
  selLayers = getSelectedShapeLayers();
  if(selLayers == null){
    return;
  }else{
    POST_SELECTED = true;
    afterMorph = selLayers;
    // UI changes:
    selLayersNames = "";
    for(var i=0;i<selLayers.length;i++){
      selLayersNames += selLayers[i].name;
      if(i != selLayers.length - 1){
      selLayersNames += ",";}
    }
    postmorphTabSelectedLayerName.text = selLayersNames;
  }
  if(PRE_SELECTED){
  uiWhenGetSelected();
  }else{
  if(postmorphTabDefaultRadioButton.value){
    morpherTabbedPanel.selection = premorphTab;
  }
  }

}



/* ********* DEFAULT-CUSTOM BUTTONS **********************
***************************************************** */

function collapseWindow(){
  settingsTabDuplicatesPanel.visible = false;
  morpherTabbedPanel.size.height = SMALL_TAB_SIZE;
  win.size.height = SMALL_WIN_SIZE;
  win.layout.resize();
}

function expandWindow(){
  settingsTabDuplicatesPanel.visible = true;
  morpherTabbedPanel.size.height = BIG_TAB_SIZE;
  win.size.height = BIG_WIN_SIZE;
  win.layout.resize();
}

collapseWindow();

// pre default-custom
premorphTabDefaultRadioButton.onClick = function(){
  premorphTabSortingDirectionPanel.enabled = false;
  premorphTabFirstVertexPanel.enabled = false;
  // Set win size to small
  if(postmorphTabDefaultRadioButton.value && settingsTabDefaultRadioButton.value){
    collapseWindow();
  }
}
premorphTabCustomRadioButton.onClick = function(){
  premorphTabSortingDirectionPanel.enabled = true;
  premorphTabFirstVertexPanel.enabled = true;
  expandWindow();
}

// post default-custom
postmorphTabDefaultRadioButton.onClick = function(){
  postmorphTabSortingDirectionPanel.enabled = false;
  postmorphTabFirstVertexPanel.enabled = false;
    // Set win size to small
  if(premorphTabDefaultRadioButton.value && settingsTabDefaultRadioButton.value){
    collapseWindow();
  }
}
postmorphTabCustomRadioButton.onClick = function(){
  postmorphTabSortingDirectionPanel.enabled = true;
  postmorphTabFirstVertexPanel.enabled = true;
  expandWindow();
}

// settings default-custom:
settingsTabDefaultRadioButton.onClick = function(){
  settingsTabLayersPanel.enabled = false;
  settingsTabDuplicatesPanel.enabled = false;
  settingsTabMorphingTimePanel.enabled = false;

  if(premorphTabDefaultRadioButton.value && postmorphTabDefaultRadioButton.value){
    collapseWindow();
  }
}
settingsTabCustomRadioButton.onClick = function(){
  settingsTabLayersPanel.enabled = true;
  settingsTabDuplicatesPanel.enabled = true;
  settingsTabMorphingTimePanel.enabled = true;
  expandWindow();
}