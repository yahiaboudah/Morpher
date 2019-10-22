
const LAYER_TYPE = {
  textLayer : "TextLayer",
  shapeLayer : "ShapeLayer"
};

function getSelected(instanceOfParam){
    
    var comp = app.project.activeItem;

    const errMsg = {
        selectComp: "Please select a composition.",
        selectLayers: "Please select one or more layers.",
        selectType : "Select only layers of type: ",
    }

    if(!comp || !(comp instanceof CompItem)){
      alert(errMsg.selectComp);
      return;
    }

    if(comp.selectedLayers.length == 0){
      alert(errMsg.selectLayers);
      return;
    }
    
    else{
      for(var i=0;i<comp.selectedLayers.length;i++){
        currLayer = comp.selectedLayers[i]; 
        instanceOf = currLayer.constructor.toString().split(" ")[1].slice(0,-2);
        if(instanceOf == instanceOfParam){
          continue;
        }else{
          alert(errMsg.selectType + isntanceOf);
          return;
        }
      }
      return comp.selectedLayers;
    }
}