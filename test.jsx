
var Morpher = function(config){
    config = config || {};
    this.sortingDirection = config.sortingDirection || this.CONSTANTS.SORTING_DIRECTIONS.topLeft;
    this.firstVertex = config.firstVertex || this.CONSTANTS.FIRST_VERTEX_OPTS.up;
    this.shit = 0;
}


Morpher.prototype.CONSTANTS = {
    
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

};

// Morpher.prototype.shit;

Morpher.prototype.provide = function () {
    return this.shit;
}

alert((new Morpher()).provide());


