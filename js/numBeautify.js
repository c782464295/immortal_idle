'use strict'
/* invoke this function when display a number variable in dom */
function beautify(x, n) {
	if (x >= 1e6) {
		var z = Math.floor(logFloor(x) / 3);
		var prefixes = ["M ", "B ", "T "];
		var s = beautify(x / Math.pow(10, 3 * z), n);
		return s + " " + prefixes[z - 2];
	} else {
		return numberWithCommas(x.toFixed(n));
	};
};
function numberWithCommas(n) {
	var parts = n.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
};
function logFloor(x) {
	var count = 0;
	while (x >= 10) {
		count++;
		x /= 10;
	};
	return count;
};
function fix(x, type) {
	if (type == "money") {
		if (x >= 1e6) {
			return beautify(x, 3);
		} else {
			return beautify(x, 0);
		};
	};
	if (type == "drug") {
		return beautify(x, 2);
	};
	if (type == "time") {
		return beautify(x, 2);
	};
	if (type == "prestige") {
		if (x >= 1e6) {
			return beautify(x, 3);
		} else {
			return beautify(x, 0);
		};
	};
	if (type == "multiplier") {
		return beautify(x, 2);
	};
	if (type == "another") {
		return beautify(x, 2)
	};
	/*
	if (x >= 1e9) {
		return beautify(x, 3);
	} else {
		return beautify(x, 2);
	};
	*/
};

export {beautify};