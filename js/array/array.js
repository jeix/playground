//	a.push(o); // append
//	a.unshift(o); // prepend
//	a.shift(); // remove first
//	a.pop(); // remove last
//	a.splice(i, 1); // remove one
//	a.splice(i, n); // remove n
//	a.splice(i, n, o, ...); // replace // a[i] = o;
//	a.splice(i, 0, o, ...); // insert
//	a.length = 0; // clear
//Array.prototype.mixin({
Array.includes({
	indexOf: function(o/*, from*/) { // pre 1.6
		var len = this.length;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		else if (len <= from) from = len - 1;
		for (; from < len; from++) {
			if (o === this[from]) {
				return from;
			}
		}
		return -1;
	},
	lastIndexOf: function(o/*, from*/) { // pre 1.6
		var len = this.length;
		var from = Number(arguments[1]) || len-1;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		else if (len <= from) from = len - 1;
		for (; -1 < from; from--) {
			if (o === this[from]) {
				return from;
			}
		}
		return -1;
	},
	every: function(func /*, thisp*/) { // pre 1.6
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && !func.call(thisp, this[i], i, this)) {
				return false;
			}
		}
		return true;
	},
	filter: function(func /*, thisp*/) { // pre 1.6
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				var val = this[i]; // in case fun mutates this
				if (func.call(thisp, this[i], i, this)) {
					res.push(val);
				}
			}
		}
		return res;
	},
	forEach: function(func /*, thisp*/) { // pre 1.6
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				func.call(thisp, this[i], i, this);
			}
		}
	},
	map: function(func /*, thisp*/) { // pre 1.6
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				res[i] = func.call(thisp, this[i], i, this);
			}
		}
		return res;
	},
	some: function(func /*, thisp*/) { // pre 1.6
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && func.call(thisp, this[i], i, this)) {
				return true;
			}
		}
		return false;
	},
	reduce: function(fun /*, initial*/) { // pre 1.8
		var len = this.length;
		if (typeof fun != "function") throw new TypeError();
		if (0 == len && 1 == arguments.length) throw new TypeError();
		var i = 0;
		if (2 <= arguments.length) {
			var rv = arguments[1];
		} else {
			do {
				if (i in this) {
					rv = this[i++];
					break;
				}
				if (len <= ++i) {
					throw new TypeError();
				}
			} while (true);
		}
		for (; i < len; i++) {
			if (i in this)
				rv = fun.call(null, rv, this[i], i, this);
		}
		return rv;
	},
	reduceRight: function(fun /*, initial*/) { // pre 1.8
		var len = this.length;
		if (typeof fun != "function") throw new TypeError();
		if (0 == len && 1 == arguments.length) throw new TypeError();
		var i = len - 1;
		if (2 <= arguments.length) {
			var rv = arguments[1];
		} else {
			do {
				if (i in this) {
					rv = this[i--];
					break;
				}
				if (--i < 0) throw new TypeError();
			} while (true);
		}
		for (; 0 <= i; i--) {
			if (i in this) {
				rv = fun.call(null, rv, this[i], i, this);
			}
		}
		return rv;
	}
}, 'only_if_not_exist');
//Array.prototype.mixin({
Array.includes({
	contains: function(o) {
		return (this.indexOf(o) >= 0);
	},
	remove: function(o) {
		var i = this.indexOf(o);
		if (i >= 0) {
			this.splice(i, 1);
		}
	},
	append: function(o,nodup){
		if (this.indexOf(o) < 0 || !nodup) {
			this.push(o);
		}
	}
});