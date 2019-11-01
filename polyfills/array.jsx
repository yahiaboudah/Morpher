
Array.prototype.rotate = function(direction, i){

    arr = eval("["+String(this)+"]");
    
    switch (direction) {
      case "RIGHT":
        while(i){
            arr.unshift(arr.pop());
            i--;
        }
        break;
      case "LEFT":
        while(i){
            arr.push(arr.shift());
            i--;
        }
        break;                    
      default:
        throw Error("Direction is either LEFT or RIGHT");
    }
  return arr;
}

Array.prototype.reduce = function(callback) {
  'use strict';
  if (this == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  var t = Object(this), len = t.length >>> 0, k = 0, value;
  if (arguments.length == 2) {
    value = arguments[1];
  } else {
    while (k < len && !(k in t)) {
      k++; 
    }
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    value = t[k++];
  }
  for (; k < len; k++) {
    if (k in t) {
      value = callback(value, t[k], k, t);
    }
  }
  return value;
};

Array.prototype.indexOf = function(searchElement, fromIndex) {

  var k;
  if (this === null) {
    throw new TypeError('"this" is null or not defined');
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (len === 0) {
    return -1;
  }

  var n = +fromIndex || 0;

  if (Math.abs(n) === Infinity) {
    n = 0;
  }

  if (n >= len) {
    return -1;
  }
  
  k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    var kValue;
    if (k in O && O[k] === searchElement) {
      return k;
    }
    k++;
  }
  return -1;
};

Array.prototype.map = function(callback) {

  var T, A, k;

  if (this == null) {
    throw new TypeError('this is null or not defined');
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  if (arguments.length > 1) {
    T = arguments[1];
  }

  A = new Array(len);

  k = 0;

  while (k < len) {

    var kValue, mappedValue;

    if (k in O) {

      kValue = O[k];

      mappedValue = callback.call(T, kValue, k, O);

      A[k] = mappedValue;
    }
    k++;
  }
  
  return A;
};

Array.prototype.forEach = function(callback, thisArg) {

  var T, k;

  if (this === null) {
    throw new TypeError(' this is null or not defined');
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }

  if (arguments.length > 1) {
    T = thisArg;
  }

  k = 0;

  while (k < len) {

    var kValue;

    if (k in O) {
      kValue = O[k];
      callback.call(T, kValue, k, O);
    }
    k++;
  }
};

