// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
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
if (Array.prototype.equals)
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
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

/**
 * rando(0,100)
 */
export function rando(mi, ma) {
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


export function deepClone(obj) {
    //in case of premitives
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    //date objects should be
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    //handle Array
    if (Array.isArray(obj)) {
        var clonedArr = [];
        obj.forEach(function (element) {
            clonedArr.push(deepClone(element))
        });
        return clonedArr;
    }

    //lastly, handle objects
    let clonedObj = new obj.constructor();
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            clonedObj[prop] = deepClone(obj[prop]);
        }
    }
    return clonedObj;
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export function copyToClipboard(input) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(input).then(() => {
            console.log("Copied to clipboard successfully.");
        }, (err) => {
            console.log("Failed to copy the text to clipboard.", err);
        });
    } else if (window.clipboardData) {
        window.clipboardData.setData("Text", input);
    }
}

export function generateGaussianNumber($mean, $stdDev) {
    const $randNumA = Math.random();
    const $randNumB = Math.random();
    const $randNumNorm = Math.sqrt(-2.0 * Math.log($randNumA)) * Math.cos(2.0 * 3.141592653589793238462643383279502884197169399375 * $randNumB);
    return $mean + $stdDev * $randNumNorm;
}



function showFireworks(force = false) {
    forcePyro = force;
    const pyro = `<div class="pyro">
					<div class="before"></div>
					<div class="after"></div>
				</div>`;
    $("body").append(pyro);
    startPyroInterval();
}


function removePyro() {
    $(".pyro").remove();
}

export function startPyroInterval() {
    clearInterval(pyroInterval);
    pyroInterval = setInterval(function () {
        if (!Swal.isVisible() && !forcePyro) {
            removePyro();
            clearInterval(pyroInterval);
        }
    }, 1000);
}


function openDiscordLink() {
    if (location.origin === "https://steam.melvoridle.com") {
        try {
            parent.nw.Shell.openExternal("https://discord.gg/melvoridle");
        } catch (e) {
            console.warn("Unable to open Discord URL: " + e);
        }
    } else {
        window.open("https://discord.gg/melvoridle", "_blank").focus();
    }
}


export function randomizer(values) {
    let picked = null;
    let i, pickedValue,
        randomNr = Math.random(),
        threshold = 0;

    for (i = 0; i < values.length; i++) {
        if (values[i].probability === '*') {
            continue;
        }

        threshold += values[i].probability;
        if (threshold > randomNr) {
            pickedValue = values[i].value;
            picked = values[i];
            break;
        }

        if (!pickedValue) {
            //nothing found based on probability value, so pick element marked with wildcard
            picked = values.find((value) => value.probability === '*');
        }
    }

    return picked;
}