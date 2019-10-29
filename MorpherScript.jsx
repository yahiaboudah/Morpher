
function MorpherScript(){
    this.win = undefined;
    this.buildUI();    
}

MorpherScript.prototype.scriptName = "Morpher";
MorpherScript.prototype.scriptVersion = "1.0";

MorpherScript.prototype.buildUI = function(){
    $.evalFile("UI/morphUI.jsx");
}
MorpherScript.prototype.morph = function(){
    
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
      app.beginUndoGroup(this.scriptName);
      morpher = new Morpher(config);
      try{
        morpher.morph();
      }catch(e){
          alert(e.toString(),this.scriptName);
      }
      app.endUndoGroup();
}