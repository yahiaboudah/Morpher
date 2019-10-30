//@include "lib/morpher.jsx";

function MorpherScript(){
    this.buildUI();
}

MorpherScript.prototype.iconpath = $.fileName;
MorpherScript.prototype.UIFilePath = "UI/morphUI.jsx";
MorpherScript.prototype.scriptName = "Morpher";
MorpherScript.prototype.scriptVersion = "1.0";

MorpherScript.prototype.buildUI = function(){
        
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

MorpherScript.prototype.run =function(){
    this.winObj.show();
}

(new MorpherScript()).run();