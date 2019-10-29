
SMALL_WIN_SIZE = 220;
BIG_WIN_SIZE = 481;

SMALL_TAB_SIZE = 140;
BIG_TAB_SIZE = 411;

// WIN
this.win = new Window("palette");
    win.text = "Morpher";
    win.orientation = "column";
    win.alignChildren = ["center","top"];
    win.spacing = 10;
    win.margins = 16;

// MORPHERTABBEDPANEL
// ==================
var morpherTabbedPanel = win.add("tabbedpanel");
    morpherTabbedPanel.alignChildren = "fill";
    morpherTabbedPanel.preferredSize.width = 219.391;
    morpherTabbedPanel.margins = 0;
    morpherTabbedPanel.alignment = ["fill","top"];
    morpherTabbedPanel.selection =null;

// PREMORPHTAB
// ===========
var premorphTab = morpherTabbedPanel.add("tab");
    premorphTab.text = "Pre";
    premorphTab.orientation = "column";
    premorphTab.alignChildren = ["left","top"];
    premorphTab.spacing = 10;
    premorphTab.margins = 10;

var premorphTabGetSelectedButton = premorphTab.add("button");
    premorphTabGetSelectedButton.text = "&Get selected";
    premorphTabGetSelectedButton.preferredSize.width = 131;
    premorphTabGetSelectedButton.justify = "center";
    premorphTabGetSelectedButton.alignment = ["center","top"];

var premorphTabSelectedLayerName = premorphTab.add("statictext");
    premorphTabSelectedLayerName.text = "selected layers' names.";
    premorphTabSelectedLayerName.alignment = ["fill","top"];

var premorphTabDivider = premorphTab.add("panel");
    premorphTabDivider.alignment = "fill";

// PREMORPHTABOPTIONSGROUP
// =======================
var premorphTabOptionsGroup = premorphTab.add("group");
    premorphTabOptionsGroup.orientation = "row";
    premorphTabOptionsGroup.alignChildren = ["left","center"];
    premorphTabOptionsGroup.spacing = 10;
    premorphTabOptionsGroup.margins = 0;
    premorphTabOptionsGroup.alignment = ["center","top"];

var premorphTabDefaultRadioButton = premorphTabOptionsGroup.add("radiobutton");
    premorphTabDefaultRadioButton.text = "Default";
    premorphTabDefaultRadioButton.value = true;

var premorphTabCustomRadioButton = premorphTabOptionsGroup.add("radiobutton");
    premorphTabCustomRadioButton.text = "Custom";

// PREMORPHTABSORTINGDIRECTIONPANEL
// ================================
var premorphTabSortingDirectionPanel = premorphTab.add("panel");
    premorphTabSortingDirectionPanel.text = "Sorting Direction";
    premorphTabSortingDirectionPanel.orientation = "column";
    premorphTabSortingDirectionPanel.alignChildren = ["left","top"];
    premorphTabSortingDirectionPanel.spacing = 10;
    premorphTabSortingDirectionPanel.margins = [10,15,10,10];
    premorphTabSortingDirectionPanel.alignment = ["fill","top"];

var premorphTabSortingDirectionPanelSortingList_array = ["topleft","leftright","rightleft","topdown","bottomup","Closest To"];
var premorphTabSortingDirectionPanelSortingList = premorphTabSortingDirectionPanel.add("dropdownlist", undefined, premorphTabSortingDirectionPanelSortingList_array);
    premorphTabSortingDirectionPanelSortingList.selection = 0;
    premorphTabSortingDirectionPanelSortingList.text = "Sorting";
    premorphTabSortingDirectionPanelSortingList.alignment = ["fill","top"];

var premorphTabSortingDirectionPanelClosestList_array = ["layer 1","layer2","layer3"];
var premorphTabSortingDirectionPanelClosestList = premorphTabSortingDirectionPanel.add("dropdownlist", undefined, premorphTabSortingDirectionPanelClosestList_array);
    premorphTabSortingDirectionPanelClosestList.selection = 1;
    premorphTabSortingDirectionPanelClosestList.text = "Closest";

// PREMORPHTABFIRSTVERTEXPANEL
// ===========================
var premorphTabFirstVertexPanel = premorphTab.add("panel");
    premorphTabFirstVertexPanel.text = "First Vertex";
    premorphTabFirstVertexPanel.orientation = "column";
    premorphTabFirstVertexPanel.alignChildren = ["left","top"];
    premorphTabFirstVertexPanel.spacing = 11;
    premorphTabFirstVertexPanel.margins = [10,15,10,10];
    premorphTabFirstVertexPanel.alignment = ["fill","top"];

var premorphTabFirstVertexPanelFirstVertexList_array = ["topleft","left","right","bottom","up","random","Closest To"];
var premorphTabFirstVertexPanelFirstVertexList = premorphTabFirstVertexPanel.add("dropdownlist", undefined, premorphTabFirstVertexPanelFirstVertexList_array);
    premorphTabFirstVertexPanelFirstVertexList.selection = 0;
    premorphTabFirstVertexPanelFirstVertexList.text = "fVertex";
    premorphTabFirstVertexPanelFirstVertexList.alignment = ["fill","top"];

var premorphTabFirstVertexPanelClosestList_array = ["layer 1","layer2","layer3"];
var premorphTabFirstVertexPanelClosestList = premorphTabFirstVertexPanel.add("dropdownlist", undefined, premorphTabFirstVertexPanelClosestList_array);
    premorphTabFirstVertexPanelClosestList.selection = 0;
    premorphTabFirstVertexPanelClosestList.text = "Closest";

// POSTMORPHTAB
// ============
var postmorphTab = morpherTabbedPanel.add("tab");
    postmorphTab.text = "Post";
    postmorphTab.orientation = "column";
    postmorphTab.alignChildren = ["left","top"];
    postmorphTab.spacing = 10;
    postmorphTab.margins = 10;

var postmorphTabGetSelectedButton = postmorphTab.add("button");
    postmorphTabGetSelectedButton.text = "&Get selected";
    postmorphTabGetSelectedButton.preferredSize.width = 131;
    postmorphTabGetSelectedButton.justify = "center";
    postmorphTabGetSelectedButton.alignment = ["center","top"];

var postmorphTabSelectedLayerName = postmorphTab.add("statictext");
    postmorphTabSelectedLayerName.text = "selected layers' names.";
    postmorphTabSelectedLayerName.alignment = ["fill","top"];

var postmorphTabDivider = postmorphTab.add("panel");
    postmorphTabDivider.alignment = "fill";

// POSTMORPHTABOPTIONSGROUP
// ========================
var postmorphTabOptionsGroup = postmorphTab.add("group");
    postmorphTabOptionsGroup.orientation = "row";
    postmorphTabOptionsGroup.alignChildren = ["left","center"];
    postmorphTabOptionsGroup.spacing = 10;
    postmorphTabOptionsGroup.margins = 0;
    postmorphTabOptionsGroup.alignment = ["center","top"];

var postmorphTabDefaultRadioButton = postmorphTabOptionsGroup.add("radiobutton");
    postmorphTabDefaultRadioButton.text = "Default";
    postmorphTabDefaultRadioButton.value = true;

var postmorphTabCustomRadioButton = postmorphTabOptionsGroup.add("radiobutton");
    postmorphTabCustomRadioButton.text = "Custom";

// POSTMORPHTABSORTINGDIRECTIONPANEL
// =================================
var postmorphTabSortingDirectionPanel = postmorphTab.add("panel");
    postmorphTabSortingDirectionPanel.text = "Sorting Direction";
    postmorphTabSortingDirectionPanel.orientation = "column";
    postmorphTabSortingDirectionPanel.alignChildren = ["left","top"];
    postmorphTabSortingDirectionPanel.spacing = 10;
    postmorphTabSortingDirectionPanel.margins = [10,15,10,10];
    postmorphTabSortingDirectionPanel.alignment = ["fill","top"];

var postmorphTabSortingDirectionPanelSortingList_array = ["topleft","leftright","rightleft","topdown","bottomup","Closest To"];
var postmorphTabSortingDirectionPanelSortingList = postmorphTabSortingDirectionPanel.add("dropdownlist", undefined, postmorphTabSortingDirectionPanelSortingList_array);
    postmorphTabSortingDirectionPanelSortingList.selection = 0;
    postmorphTabSortingDirectionPanelSortingList.text = "Sorting";
    postmorphTabSortingDirectionPanelSortingList.alignment = ["fill","top"];

var postmorphTabSortingDirectionPanelClosestList_array = ["layer 1","layer2","layer3"];
var postmorphTabSortingDirectionPanelClosestList = postmorphTabSortingDirectionPanel.add("dropdownlist", undefined, postmorphTabSortingDirectionPanelClosestList_array);
    postmorphTabSortingDirectionPanelClosestList.selection = 1;
    postmorphTabSortingDirectionPanelClosestList.text = "Closest";

// POSTMORPHTABFIRSTVERTEXPANEL
// ============================
var postmorphTabFirstVertexPanel = postmorphTab.add("panel");
    postmorphTabFirstVertexPanel.text = "First Vertex";
    postmorphTabFirstVertexPanel.orientation = "column";
    postmorphTabFirstVertexPanel.alignChildren = ["left","top"];
    postmorphTabFirstVertexPanel.spacing = 11;
    postmorphTabFirstVertexPanel.margins = [10,15,10,10];
    postmorphTabFirstVertexPanel.alignment = ["fill","top"];

var postmorphTabFirstVertexPanelFirstVertexList_array = ["topleft","left","right","bottom","up","random","Closest To"];
var postmorphTabFirstVertexPanelFirstVertexList = postmorphTabFirstVertexPanel.add("dropdownlist", undefined, postmorphTabFirstVertexPanelFirstVertexList_array);
    postmorphTabFirstVertexPanelFirstVertexList.selection = 0;
    postmorphTabFirstVertexPanelFirstVertexList.text = "fVertex";
    postmorphTabFirstVertexPanelFirstVertexList.alignment = ["fill","top"];

var postmorphTabFirstVertexPanelClosestList_array = ["layer 1","layer2","layer3"];
var postmorphTabFirstVertexPanelClosestList = postmorphTabFirstVertexPanel.add("dropdownlist", undefined, postmorphTabFirstVertexPanelClosestList_array);
    postmorphTabFirstVertexPanelClosestList.selection = 0;
    postmorphTabFirstVertexPanelClosestList.text = "Closest";

// SETTINGSTAB
// ===========
var settingsTab = morpherTabbedPanel.add("tab");
    settingsTab.text = "Settings";
    settingsTab.orientation = "column";
    settingsTab.alignChildren = ["left","top"];
    settingsTab.spacing = 10;
    settingsTab.margins = 10;

// MORPHERTABBEDPANEL
// ==================
morpherTabbedPanel.selection = postmorphTab;

// SETTINGSTABOPTIONSGROUP
// =======================
var settingsTabOptionsGroup = settingsTab.add("group");
    settingsTabOptionsGroup.orientation = "row";
    settingsTabOptionsGroup.alignChildren = ["left","center"];
    settingsTabOptionsGroup.spacing = 10;
    settingsTabOptionsGroup.margins = 0;
    settingsTabOptionsGroup.alignment = ["center","top"];

var settingsTabDefaultRadioButton = settingsTabOptionsGroup.add("radiobutton");
    settingsTabDefaultRadioButton.text = "Default";
    settingsTabDefaultRadioButton.value = true;

var settingsTabCustomRadioButton = settingsTabOptionsGroup.add("radiobutton");
    settingsTabCustomRadioButton.text = "Custom";

// SETTINGSTABDUPLICATESPANEL
// ==========================
var settingsTabDuplicatesPanel = settingsTab.add("panel");
    settingsTabDuplicatesPanel.text = "duplicates";
    settingsTabDuplicatesPanel.orientation = "column";
    settingsTabDuplicatesPanel.alignChildren = ["left","top"];
    settingsTabDuplicatesPanel.spacing = 10;
    settingsTabDuplicatesPanel.margins = 10;
    settingsTabDuplicatesPanel.alignment = ["fill","top"];
    settingsTabDuplicatesPanel.visible = false;

var settingsTabDuplicatesPanelDistributeList_array = ["center of mass","random","closest shapes","manually"];
var settingsTabDuplicatesPanelDistributeList = settingsTabDuplicatesPanel.add("dropdownlist", undefined, settingsTabDuplicatesPanelDistributeList_array);
    settingsTabDuplicatesPanelDistributeList.selection = 1;
    settingsTabDuplicatesPanelDistributeList.text = "distribute";

// SETTINGSTABDUPLICATESPANELMANUALGROUP
// =====================================
var settingsTabDuplicatesPanelManualGroup = settingsTabDuplicatesPanel.add("group");
    settingsTabDuplicatesPanelManualGroup.orientation = "row";
    settingsTabDuplicatesPanelManualGroup.alignChildren = ["left","center"];
    settingsTabDuplicatesPanelManualGroup.spacing = 10;
    settingsTabDuplicatesPanelManualGroup.margins = 0;

var manuallyChoosingText = settingsTabDuplicatesPanelManualGroup.add("statictext");
    manuallyChoosingText.text = "Manual";

var button1 = settingsTabDuplicatesPanelManualGroup.add("button");
    button1.text = "pre";
    button1.preferredSize.width = 49;
    button1.justify = "center";

var button2 = settingsTabDuplicatesPanelManualGroup.add("button");
    button2.text = "post";
    button2.preferredSize.width = 44;
    button2.justify = "center";

// SETTINGSTABDUPLICATESPANELMANUALLYINDICESGROUP
// ==============================================
var settingsTabDuplicatesPanelManuallyIndicesGroup = settingsTabDuplicatesPanel.add("group");
    settingsTabDuplicatesPanelManuallyIndicesGroup.orientation = "row";
    settingsTabDuplicatesPanelManuallyIndicesGroup.alignChildren = ["left","center"];
    settingsTabDuplicatesPanelManuallyIndicesGroup.spacing = 10;
    settingsTabDuplicatesPanelManuallyIndicesGroup.margins = 0;

var settingsTabDuplicatesPanelManuallyIndicesText = settingsTabDuplicatesPanelManuallyIndicesGroup.add("statictext");
    settingsTabDuplicatesPanelManuallyIndicesText.text = "Indices";

// SETTINGSTABLAYERSPANEL
// ======================
var settingsTabLayersPanel = settingsTab.add("panel");
    settingsTabLayersPanel.text = "Layers";
    settingsTabLayersPanel.orientation = "row";
    settingsTabLayersPanel.alignChildren = ["left","top"];
    settingsTabLayersPanel.spacing = 10;
    settingsTabLayersPanel.margins = 10;
    settingsTabLayersPanel.alignment = ["fill","top"];

// expandGroup
// ======
var expandGroup = settingsTabLayersPanel.add("group");
    expandGroup.orientation = "column";
    expandGroup.alignChildren = ["left","center"];
    expandGroup.spacing = 10;
    expandGroup.margins = 0;

var settingsTabLayersPanelExpandText = expandGroup.add("statictext");
    settingsTabLayersPanelExpandText.text = "Expand";

var settingsTabLayersPanelDeleteRadioButton = expandGroup.add("radiobutton");
    settingsTabLayersPanelDeleteRadioButton.text = "delete";
    settingsTabLayersPanelDeleteRadioButton.value = true;

var settingsTabLayersPanelDisableRadioButton = expandGroup.add("radiobutton");
    settingsTabLayersPanelDisableRadioButton.text = "disable";

var settingsTabLayersPanelExpandNoRadioButton = expandGroup.add("radiobutton");
    settingsTabLayersPanelExpandNoRadioButton.text = "no";

// shrinkGroup
// ======
var shrinkGroup = settingsTabLayersPanel.add("group");
    shrinkGroup.orientation = "column";
    shrinkGroup.alignChildren = ["left","center"];
    shrinkGroup.spacing = 10;
    shrinkGroup.margins = 0;

var statictext1 = shrinkGroup.add("statictext");
    statictext1.text = "Shrink";

var settingsTabLayersPanelRestoreRadioButton = shrinkGroup.add("radiobutton");
    settingsTabLayersPanelRestoreRadioButton.text = "restore";
    settingsTabLayersPanelRestoreRadioButton.value = true;

var settingsTabLayersPanelKeepRadioButton = shrinkGroup.add("radiobutton");
    settingsTabLayersPanelKeepRadioButton.text = "keep";

var settingsTabLayersPanelShrinkNoRadioButton = shrinkGroup.add("radiobutton");
    settingsTabLayersPanelShrinkNoRadioButton.text = "no";

// SETTINGSTABMORPHINGTIMEPANEL
// ============================
var settingsTabMorphingTimePanel = settingsTab.add("panel");
    settingsTabMorphingTimePanel.text = "morphing time";
    settingsTabMorphingTimePanel.orientation = "column";
    settingsTabMorphingTimePanel.alignChildren = ["left","center"];
    settingsTabMorphingTimePanel.spacing = 10;
    settingsTabMorphingTimePanel.margins = 10;
    settingsTabMorphingTimePanel.alignment = ["fill","top"];

// GROUP3
// ======
var group3 = settingsTabMorphingTimePanel.add("group");
    group3.orientation = "row";
    group3.alignChildren = ["center","center"];
    group3.spacing = 10;
    group3.margins = 0;

var settingsTabMorphingTimePanelText = group3.add("statictext");
    settingsTabMorphingTimePanelText.text = "Time:";

var settingsTabMorphingTimePanelEditText = group3.add("edittext");
    settingsTabMorphingTimePanelEditText.text = "0.53";
    settingsTabMorphingTimePanelEditText.preferredSize.width = 128;
    settingsTabMorphingTimePanelEditText.preferredSize.height = 23;

// GROUP4
// ======
var morphButtonGroup = win.add("group");
    morphButtonGroup.orientation = "row";
    morphButtonGroup.alignChildren = ["left","center"];
    morphButtonGroup.spacing = 10;
    morphButtonGroup.margins = 0;

var morphButton = morphButtonGroup.add("button");
    morphButton.text = "Morph";
    morphButton.preferredSize.width = 87;
    morphButton.justify = "center";
    // Set the tabbedpanel selection to premorphTab
    morpherTabbedPanel.selection = premorphTab;