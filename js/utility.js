if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

Map.prototype.swap = function (a, b) {
    var all = [...this],
        indexA = all.findIndex(([v]) => v === a),
        indexB = all.findIndex(([v]) => v === b);
    
    [all[indexA], all[indexB]] = [all[indexB], all[indexA]];
    this.forEach((_, k, m) => m.delete(k));
    all.forEach(([k, v]) => this.set(k, v));
}


// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

/**
 * rando(0,100)
 */
function rando(mi, ma) {
    return Math.floor(Math.random() * (ma - mi + 1) + mi);
};

/* json循环检测
 */
function isCyclic(obj) {
    var keys = [];
    var stack = [];
    var stackSet = new Set();
    var detected = false;
  
    function detect(obj, key) {
      if (obj && typeof obj != 'object') { return; }
  
      if (stackSet.has(obj)) { // it's cyclic! Print the object and its locations.
        var oldindex = stack.indexOf(obj);
        var l1 = keys.join('.') + '.' + key;
        var l2 = keys.slice(0, oldindex + 1).join('.');
        console.log('CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj);
        console.log(obj);
        detected = true;
        return;
      }
  
      keys.push(key);
      stack.push(obj);
      stackSet.add(obj);
      for (var k in obj) { //dive on the object's children
        if (Object.prototype.hasOwnProperty.call(obj, k)) { detect(obj[k], k); }
      }
  
      keys.pop();
      stack.pop();
      stackSet.delete(obj);
      return;
    }
  
    detect(obj, 'obj');
    return detected;
  }


/* 循环延时 await sleep(<duration>);
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function deepClone(obj){
    //in case of premitives
    if(obj===null || typeof obj !== "object"){
        return obj;
    }

    //date objects should be
    if(obj instanceof Date){
        return new Date(obj.getTime());
    }

    //handle Array
    if(Array.isArray(obj)){
        var clonedArr = [];
        obj.forEach(function(element){
            clonedArr.push(deepClone(element))
        });
        return clonedArr;
    }

    //lastly, handle objects
    let clonedObj = new obj.constructor();
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            clonedObj[prop] = deepClone(obj[prop]);
        }
    }
    return clonedObj;
}