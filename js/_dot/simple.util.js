/****
var $ = function(id) { return document.getElementById(id); }; // imitate prototype
var $N = function(name) { return document.getElementsByName(name); };
var $T = function(tag) { return document.getElementsByTagName(tag); };
// ajax
function do_ajax(target, args, callback) {
	var uri = '/' + target;
	var xmlhttp;
	if (typeof XMLHttpRequest != "undefined") {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		if (!xmlhttp) {
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	if (!xmlhttp) {
		return;
	}
	xmlhttp.open('POST', uri, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=euc-kr");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			var txt = xmlhttp.responseText.replace(/^\s*|\s*$/g,"");
			//var status = txt.charAt(0);
			//var data = txt.substring(2);
			callback(txt);
		}
	};
	xmlhttp.send(args);
	delete xmlhttp;
}
// debug
function addDebugPane() {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode("\n\n["));
	var span = document.createElement('span');
	span.id = 'debug';
	span.onclick = function() { this.innerHTML = ''; }
	body.appendChild(span);
	body.appendChild(document.createTextNode("]\n"));
}
function debug(s) {
	var debugPane = $('debug');
	if (undefined == debugPane) {
		addDebugPane();
		debugPane = $('debug');
	}
	debugPane.innerHTML += s + '<br>\n';
}
//****/
function debug2(s) {
	var debugWin = open('','x_debug','width=360,height=720,resizable=yes,scrollbars=yes');
	var doc = debugWin.document;
	var debugPane = doc.getElementById('debug');
	if (undefined == debugPane) {
		var body = doc.getElementsByTagName('body')[0];
		debugPane = doc.createElement('div');
		debugPane.id = 'debug';
		debugPane.onclick = function() { this.innerHTML = ''; }
		body.appendChild(debugPane);
	}
	debugPane.innerHTML += s + '<br>\n';
}
/****
// @deprecated
function print(s) {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode(s));
}
// @deprecated
function println(s) {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode(s));
	body.appendChild(document.createElement('br'));
	body.appendChild(document.createTextNode('\n'));
}
// @deprecated
function println_span(s) {
	var body = document.getElementsByTagName('body')[0];
	var span = document.createElement('span');
	body.appendChild(span);
	span.innerHTML = s;
	body.appendChild(document.createElement('br'));
	body.appendChild(document.createTextNode('\n'));
}
//****/
function xprint(s) {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode(s));
}
function xprintln(s) {
	var body = document.getElementsByTagName('body')[0];
	if (s != undefined) body.appendChild(document.createTextNode(s));
	body.appendChild(document.createElement('br'));
	body.appendChild(document.createTextNode('\n'));
}
// String
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, '');
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/, '');
}
String.prototype.trim = function() {
	return this.ltrim().rtrim();
}
String.prototype.lengthB = function() {
	var len = this.length;
	var lenB = 0;
	for (var i = 0; i < len; i++) {
		var chr = this.charAt(i);
		if (escape(chr).length > 4) {
			lenB += 2;
		} else {
			lenB++;
		}
	}
	return lenB;
};
String.prototype.substrB = function(offsetB, lengthB) {
	var len = this.length;
	var off = 0;
	var lenB = 0;
	for (var i = 0; i < len; i++) {
		var chr = this.charAt(i);
		if (escape(chr).length > 4) {
			lenB += 2;
		} else {
			lenB++;
		}
		if (0 == off && offsetB == lenB) off = i + 1;
		if (lenB-offsetB > lengthB) return this.substring(off, i);
	}
	return this.substring(off);;
};
String.prototype.lpad = function(size/*, pad*/) {
	var s = this.slice(0);
	if (undefined == size || size <= s.length) return s;
	var len = size - s.length; // TODO byte-length
	var pad = ' ';
	if (1 < arguments.length) pad = arguments[1];
	var pad_len = pad.length;
	var ls = '';
	while (pad_len <= len) {
		ls = pad + ls;
		len = len - pad_len;
	}
	if (0 < len) ls = ls + pad.substr(0, len);
	return ls + s;
};
String.prototype.rpad = function(size/*, pad*/) {
	var s = this.slice(0);
	if (undefined == size || size <= s.length) return s;
	var len = size - s.length; // TODO byte-length
	var pad = ' ';
	if (1 < arguments.length) pad = arguments[1];
	var pad_len = pad.length;
	var rs = '';
	while (pad_len <= len) {
		rs = rs + pad;
		len = len - pad_len;
	}
	if (0 < len) rs = rs + pad.substr(0, len);
	return s + rs;
};
String.prototype.center = function(size/*, pad*/) {
	var s = this.slice(0);
	if (undefined == size || size <= s.length) return s;
	var len = size - s.length; // TODO byte-length
	var pad = ' ';
	if (1 < arguments.length) pad = arguments[1];
	var pad_len = pad.length;
	var ls = '';
	var rs = '';
	while ((2 * pad_len) <= len) {
		ls = pad + ls;
		rs = rs + pad;
		len = len - (2 * pad_len);
	}
	if (pad_len < len) {
		ls = pad + ls;
		len = len - pad_len;
		if (0 < len) rs = rs + pad.substr(0, len);
	} else {
		if (0 < len) ls = ls + pad.substr(0, len);
	}
	return ls + s + rs;
};
String.prototype.repeat = function(n) {
	var sb = '';
	var s = this.slice(0);
	for (var i = 0; i< n; i++) sb += s;
	return sb;
};

// Array
//	a.push(o); // append
//	a.unshift(o); // prepend
//	a.shift(); // remove first
//	a.pop(); // remove last
//	a.splice(i, 1); // remove one
//	a.splice(i, n); // remove n
//	a.splice(i, n, o, ...); // replace // a[i] = o;
//	a.splice(i, 0, o, ...); // insert
//	a.length = 0; // clear
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(o/*, from*/) {
		var len = this.length;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		else if (len <= from) from = len - 1;
		for (; from < len; from++) {
			if (o === this[from])
				return from;
		}
		return -1;
	};
};
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(o/*, from*/) {
		var len = this.length;
		var from = Number(arguments[1]) || len-1;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		else if (len <= from) from = len - 1;
		for (; -1 < from; from--) {
			if (o === this[from])
				return from;
		}
		return -1;
	};
};
if (!Array.prototype.every) {
	Array.prototype.every = function(func /*, thisp*/) {
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && !func.call(thisp, this[i], i, this))
				return false;
		}
		return true;
	};
};
if (!Array.prototype.filter) {
	Array.prototype.filter = function(func /*, thisp*/) {
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && func.call(thisp, this[i], i, this))
				res.push(val);
		}
		return res;
	};
};
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(func /*, thisp*/) {
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this)
				func.call(thisp, this[i], i, this);
		}
	};
};
if (!Array.prototype.map) {
	Array.prototype.map = function(func /*, thisp*/) {
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this)
				res[i] = func.call(thisp, this[i], i, this);
		}

		return res;
	};
};
if (!Array.prototype.some) {
	Array.prototype.some = function(func /*, thisp*/) {
		var len = this.length;
		if (typeof func != "function") throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && func.call(thisp, this[i], i, this))
				return true;
		}
		return false;
	};
};
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(fun /*, initial*/) {
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
				if (len <= ++i)
					throw new TypeError();
			} while (true);
		}
		for (; i < len; i++) {
			if (i in this)
				rv = fun.call(null, rv, this[i], i, this);
		}
		return rv;
	};
};
if (!Array.prototype.reduceRight) {
	Array.prototype.reduceRight = function(fun /*, initial*/) {
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
				if (--i < 0)
					throw new TypeError();
			} while (true);
		}
		for (; 0 <= i; i--) {
			if (i in this)
				rv = fun.call(null, rv, this[i], i, this);
		}
		return rv;
	};
};
Array.prototype.contains = function(o) {
	return (this.indexOf(o) >= 0);
};
Array.prototype.remove = function(o) {
	var i = this.indexOf(o);
	if (i >= 0) {
		this.splice(i, 1);
	}
};
Array.prototype.append = function(o,nodup){
	if (this.indexOf(o) < 0 || !nodup) {
		this.push(o);
	}
};