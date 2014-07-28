var $ = function (id) { return document.getElementById(id); };
var $C = function (klass) { return document.getElementsByClassName(klass); };
var $N = function (name) { return document.getElementsByName(name); };
var $T = function (tag) { return document.getElementsByTagName(tag); };

////////////////////////////////////////////////////////////////////////////////
// debug

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

var debug = (function () {
	if (console && console.log) {
		return function (s) { console.log(s); };
	} else {
		return function (s) {
			var win = open('','x_debug','width=360,height=720,resizable=yes,scrollbars=yes');
			var doc = win.document;
			var pane = doc.getElementById('debug');
			if (undefined == pane) {
				var body = doc.getElementsByTagName('body')[0];
				body.style.fontFamily = '"Courier New", Monospace';
				body.style.fontSize = '9pt';
				body.style.backgroundColor = '#c0c0c0';
				body.style.color = '#000';
				pane = doc.createElement('div');
				pane.id = 'debug';
				pane.onclick = function() { this.innerHTML = ''; }
				body.appendChild(pane);
			}
			pane.innerHTML += s + '<br>\n';
		};
	}
})();

////////////////////////////////////////////////////////////////////////////////
// exec

function xprint_code(codelet) {
	var buf = codelet.toString().replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	var body = document.getElementsByTagName('body')[0];
	var code = document.createElement('code');
	var pre = document.createElement('pre');
	pre.appendChild(document.createTextNode(buf));
	code.appendChild(pre);
	body.appendChild(code);
}

function exec(expr, noret, cmt) {
	var buf = expr;
	var ret = eval.call(window, expr);
	if (ret != undefined && noret == undefined) buf += " // ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_if(expr, cmt) {
	var buf = "if (" + expr + ")";
	//var ret = eval.call(window, expr + "?true:false");
	var ret = eval.call(window, expr);
	ret = ret ? "true" : "false"
	buf += " ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_def(expr) {
	var buf = expr.replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	var ret = eval.call(window, expr);
	xprint_code(buf);
}

////////////////////////////////////////////////////////////////////////////////
// string

if (! String.prototype.ltrim) String.prototype.ltrim = (function () {
	if (String.prototype.trimLeft) { // 1.8.1
		return function () { return this.trimLeft(); };
	} else {
		return function () { return this.replace(/^\s+/, ''); };
	}
})();
if (! String.prototype.rtrim) String.prototype.rtrim = (function () {
	if (String.prototype.trimRight) { // 1.8.1
		return function () { return this.trimRight(); };
	} else {
		return function () { return this.replace(/\s+$/, ''); };
	}
})();
if (! String.prototype.trim) String.prototype.trim = (function () {
	if (String.prototype.trimLeft && String.prototype.trimRight) { // 1.8.1 BUT not here CUZ native trim()
		return function () { return this.trimLeft().trimRight(); };
	} else {
		return function () { return this.ltrim().rtrim(); };
	}
})();
if (! String.prototype.length_in_bytes) String.prototype.length_in_bytes = function () {
	var byte_len = 0;
	var char_len = this.length;
	for (var i = 0; i < char_len; i++) {
		var chr = this.charAt(i);
		if (escape(chr).length > 4) {
			byte_len += 3;
		} else {
			byte_len++;
		}
	}
	return byte_len;
};
if (! String.prototype.substr_in_bytes) String.prototype.substr_in_bytes = function (offset, length) {
	var off = 0;
	var byte_len = 0;
	var char_len = this.length;
	for (var i = 0; i < char_len; i++) {
		var chr = this.charAt(i);
		if (escape(chr).length > 4) {
			byte_len += 3;
		} else {
			byte_len++;
		}
		if (0 == off && offset == byte_len) off = i + 1;
		if (byte_len-offset > length) return this.substring(off, i);
	}
	return this.substring(off);
};
if (! String.prototype.lpad) String.prototype.lpad = function (size/*, pad*/) {
	var s = this.slice(0);
	if (undefined == size || size <= s.length) return s;
	var len = size - s.length; // TODO byte-length
	var pad = ' ';
	if (1 < arguments.length) pad = arguments[1];
	var pad_len = pad.length;
	var ls = '';
	while (pad_len <= len) {
		ls = ls + pad;
		len = len - pad_len;
	}
	if (0 < len) ls = ls + pad.substr(0, len);
	return ls + s;
};
if (! String.prototype.rpad) String.prototype.rpad = function (size/*, pad*/) {
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
if (! String.prototype.center) String.prototype.center = function (size/*, pad*/) {
	var s = this.slice(0);
	if (undefined == size || size <= s.length) return s;
	var len = size - s.length; // TODO byte-length
	var pad = ' ';
	if (1 < arguments.length) pad = arguments[1];
	var pad_len = pad.length;
	var ls = '';
	var rs = '';
	while ((2 * pad_len) <= len) {
		ls = ls + pad;
		rs = rs + pad;
		len = len - (2 * pad_len);
	}
	if (pad_len < len) {
		ls = ls + pad;
		len = len - pad_len;
		if (0 < len) rs = rs + pad.substr(0, len);
	} else {
		if (0 < len) ls = ls + pad.substr(0, len);
	}
	return ls + s + rs;
};
if (! String.prototype.repeat) String.prototype.repeat = function (n) {
	var sb = '';
	var s = this.slice(0);
	for (var i = 0; i< n; i++) sb += s;
	return sb;
};

////////////////////////////////////////////////////////////////////////////////
// array

//	a.push(o); // append
//	a.unshift(o); // prepend
//	a.shift(); // remove first
//	a.pop(); // remove last
//	a.slice(i); // a[i:]
//	a.slice(i, j); // a[i...j]
//	a.splice(i, 1); // remove one
//	a.splice(i, n); // remove n
//	a.splice(i, n, o, ...); // replace // a[i] = o;
//	a.splice(i, 0, o, ...); // insert
//	a.length = 0; // clear

if (! Array.prototype.indexOf) // pre 1.6
Array.prototype.indexOf = function (o/*, from*/) {
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
};
if (! Array.prototype.lastIndexOf) // pre 1.6
Array.prototype.lastIndexOf = function (o/*, from*/) {
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
};
if (! Array.prototype.every) // pre 1.6
Array.prototype.every = function (func /*, thisp*/) {
	var len = this.length;
	if (typeof func != "function") throw new TypeError();
	var thisp = arguments[1];
	for (var i = 0; i < len; i++) {
		if (i in this && !func.call(thisp, this[i], i, this)) {
			return false;
		}
	}
	return true;
};
if (! Array.prototype.filter) // pre 1.6
Array.prototype.filter = function (func /*, thisp*/) {
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
};
if (! Array.prototype.forEach) // pre 1.6
Array.prototype.forEach = function (func /*, thisp*/) {
	var len = this.length;
	if (typeof func != "function") throw new TypeError();
	var thisp = arguments[1];
	for (var i = 0; i < len; i++) {
		if (i in this) {
			func.call(thisp, this[i], i, this);
		}
	}
};
if (! Array.prototype.map) // pre 1.6
Array.prototype.map = function (func /*, thisp*/) {
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
};
if (! Array.prototype.some) // pre 1.6
Array.prototype.some = function (func /*, thisp*/) {
	var len = this.length;
	if (typeof func != "function") throw new TypeError();
	var thisp = arguments[1];
	for (var i = 0; i < len; i++) {
		if (i in this && func.call(thisp, this[i], i, this)) {
			return true;
		}
	}
	return false;
};
if (! Array.prototype.reduce) // pre 1.8
Array.prototype.reduce = function (func /*, initial*/) {
	var len = this.length;
	if (typeof func != "function") throw new TypeError();
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
			rv = func.call(null, rv, this[i], i, this);
	}
	return rv;
};
if (! Array.prototype.reduceRight) // pre 1.8
Array.prototype.reduceRight = function (func /*, initial*/) {
	var len = this.length;
	if (typeof func != "function") throw new TypeError();
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
			rv = func.call(null, rv, this[i], i, this);
		}
	}
	return rv;
};

if (! Array.prototype.contains) Array.prototype.contains = function (o) {
	return (this.indexOf(o) >= 0);
};
if (! Array.prototype.remove) Array.prototype.remove = function (o) {
	var i = this.indexOf(o);
	if (i >= 0) {
		this.splice(i, 1);
	}
};
if (! Array.prototype.append) Array.prototype.append = function (o, nodup) {
	if (this.indexOf(o) < 0 || ! nodup) {
		this.push(o);
	}
};

////////////////////////////////////////////////////////////////////////////////
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
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
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

////////////////////////////////////////////////////////////////////////////////
// inheritance

////////////////////////////////////////
// Object.create()

if (typeof Object.create !== 'function') // pre 1.8.5
Object.create = function (o) { // by Douglas Crockford
	function F() {}
	F.prototype = o;
	return new F();
};

////////////////////////////////////////
// subtyping

if (! Function.prototype.inherit) Function.prototype.inherit = function (T) {
	this.prototype = new T();
};

////////////////////////////////////////////////////////////////////////////////
// functionality extension

////////////////////////////////////////
// include/extend module (like Ruby)

Object.$include = function (from, to) {
	for (var k in from) {
		if (from.hasOwnProperty(k)) {
			to[k] = from[k];
		}
	}
};

Object.prototype.includes = function (o) {
	Object.$include(o, this.prototype);
}
Object.prototype.extends = function (o) {
	Object.$include(o, this);
}

////////////////////////////////////////
// include/extend single function

if (! Object.prototype.remove_functions) Object.prototype.remove_functions = function (names) {
	for (var i = 0; i < names.length; i++) {
		delete this[names[i]];
	}
};

if (! Object.prototype.introduce) Object.prototype.introduce = function (f) {
	if (f && f instanceof Function) {
		this[f.name] = function () {
			return f.apply(this, arguments);
		};
	}
};

////////////////////////////////////////
// context substitution || borrow function -- using f.apply(), f.bind()

if (! Object.prototype.run) Object.prototype.run = function (f) {
	f.apply(this, Array.prototype.slice.call(arguments, 1));
};

if (! Function.prototype.bind) // pre 1.8.5
Function.prototype.bind = function (obj) {
	if (typeof this !== "function") { // closest thing possible to the ECMAScript 5 internal IsCallable function
		throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");
	}
	var aArgs = Array.prototype.slice.call(arguments, 1);
	var fToBind = this;
	var fNOP = function () {};
	var fBound = function () {
		console.log(this instanceof fNOP);
		return fToBind.apply(this instanceof fNOP ? this : oThis || window, 
							aArgs.concat(Array.prototype.slice.call(arguments)));
	};
	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();
	return fBound;
};

////////////////////////////////////////////////////////////////////////////////
// FX

var FX = {};
FX.DOM = {};

////////////////////////////////////////
// class

FX.DOM.Klass = {
	add_class: function (klass) {
		if (this.className.indexOf(klass) == -1) {
			this.className = (this.className + ' ' + klass).trim();
		}
	},
	has_class: function (klass) {
		return this.className.indexOf(klass) >= 0;
	},
	remove_class: function (klass) {
		this.className = this.className.split(klass).join(' ').replace(/  +/g, ' ').trim();
	},
	replace_class: function (klass_from, klass_to) {
		if (this.className.indexOf(klass_from) >= 0) {
			this.className = this.className.replace(klass_from, klass_to);
		}
	}
};
FX.Klass = {
	add_class: function () {
		if (this.elem && this.elem.add_class) {
			this.elem.add_class.apply(this.elem, arguments);
		}
	},
	has_class: function () {
		if (this.elem && this.elem.has_class) {
			this.elem.has_class.apply(this.elem, arguments);
		}
	},
	remove_class: function () {
		if (this.elem && this.elem.remove_class) {
			this.elem.remove_class.apply(this.elem, arguments);
		}
	},
	replace_class: function () {
		if (this.elem && this.elem.replace_class) {
			this.elem.replace_class.apply(this.elem, arguments);
		}
	}
};

////////////////////////////////////////
// attribute

FX.DOM.Attribute = {
	attr: function (name, value) {
		if (arguments.length >= 2) {
			this.setAttribute(name, value);
		} else if (name) {
			return this.getAttribute(name);
		}
	},
	remove_attr: function (name) {
		if (name) {
			this.removeAttribute(name);
		}
	}
};
FX.Attribute = {
	attr: function () {
		if (this.elem && this.elem.attr) {
			this.elem.attr.apply(this.elem, arguments);
		}
	},
	remove_attr: function () {
		if (this.elem && this.elem.remove_attr) {
			this.elem.remove_attr.apply(this.elem, arguments);
		}
	}
};

////////////////////////////////////////
// select

FX.DOM.Select = {
	append_option: function(val, txt) {
		this.add(new Option(txt, val), undefined);
	},
	change_option: function(val) {
		var selectedIndex = this.selectedIndex;
		for (var i = 0; i < this.options.length; i++) {
			if (this.options[i].value == val) {
				this.selectedIndex = i;
				break;
			}
		}
		if (selectedIndex != this.selectedIndex) {
			if (this.onchange) {
				this.onchange();
			}
		}
	},
	has_option: function(val) {
		for (var i = 0; i < this.options.length; i++) {
			if (this.options[i].value == val) {
				return true;
			}
		}
		return false;
	}
};
FX.Select = {
	append_option: function () {
		if (this.elem && this.elem.append_option) {
			this.elem.append_option.apply(this.elem, arguments);
		}
		return this;
	},
	change_option: function () {
		if (this.elem && this.elem.change_option) {
			this.elem.change_option.apply(this.elem, arguments);
		}
	},
	has_option: function () {
		if (this.elem && this.elem.has_option) {
			return this.elem.has_option.apply(this.elem, arguments);
		}
	}
};

////////////////////////////////////////
// enable/disable

FX.DOM.Enable = {};
FX.DOM.Enable.Default = {
	enable: function() {
		this.change_enable(true);
	},
	disable: function() {
		this.change_enable(false);
	},
	change_enable: function(enable) {
		this.disabled = (enable == false);
	}
}
FX.DOM.Enable.Text = {
	change_enable: function(enable) {
		var klass_from = "rw";
		var klass_to = "ro";
		if (enable) {
			klass_from = "ro";
			klass_to = "rw";
		}
		if (this.replace_class) {
			this.replace_class(klass_from, klass_to);
		}
		//this.disabled = (enable == false);
		this.readOnly = (enable == false);
		this.onselectstart = function () { return enable; } // IE -- selection by drag
		this.onmousedown = function () { return enable; } // FF -- blinking text cursor by click, selection by drag
		this.oncopy = function () { return enable; } // FF -- selection by tab key
		this.style.cursor = (enable ? 'text' : 'default');
	}
};
FX.DOM.Enable.Select = {
	change_enable: function(enable) {
		var klass_from = "rw";
		var klass_to = "ro";
		if (enable) {
			klass_from = "ro";
			klass_to = "rw";
		}
		if (this.replace_class) {
			this.replace_class(klass_from, klass_to);
		}
		this.disabled = (enable == false);
	}
};
FX.DOM.Enable.Checkbox = {
	change_enable: function(enable) {
		this.disabled = (enable == false);
	}
};
FX.DOM.Enable.Radio = {
	change_enable: function(enable) {
		this.disabled = (enable == false);
	}
};
FX.DOM.Enable.Image = {
	change_enable: function(enable) {
		this.style.cursor = (enable ? 'pointer' : 'default');
	}
};
FX.Enable = {
	enable: function () {
		if (this.elem && this.elem.enable) {
			this.elem.enable.apply(this.elem, arguments);
		}
	},
	disable: function () {
		if (this.elem && this.elem.disable) {
			this.elem.disable.apply(this.elem, arguments);
		}
	}
};

////////////////////////////////////////
// event handler

FX.EventHandler = {
	bind: function (handlers) {
		if (this.elem && this.elem.extends) {
			this.elem.extends(handlers); // TODO addEventListener
		}
		return this;
	},
	click: function () {
		if (this.elem && this.elem.click) {
			this.elem.click();
		}
		return this;
	}
};

////////////////////////////////////////
// format

FX.Formatter = {};
FX.Formatter.Date = {
	pattern: 'yyyy-mm-dd',
	parse: function (s) {
		if (undefined == s) return;
		var y, m, d;
		if (s.match(/^\d{4}-\d{2}-\d{2}$/)) { // 'YYYY-MM-DD' format
			y = parseInt(s.substr(0, 4), 10);
			m = parseInt(s.substr(5, 2), 10);
			d = parseInt(s.substr(8, 2), 10);
		} else if (s.match(/^\d{2}-\d{2}-\d{2}$/)) { // 'YY-MM-DD' format
			y = parseInt(s.substr(0, 2), 10);
			if (30 <= y && y <= 99) y += 1900;
			else y += 2000;
			m = parseInt(s.substr(3, 2), 10);
			d = parseInt(s.substr(6, 2), 10);
		} else if (s.match(/^\d{8}$/)) { // 'YYYYMMDD' format
			y = parseInt(s.substr(0, 4), 10);
			m = parseInt(s.substr(4, 2), 10);
			d = parseInt(s.substr(6, 2), 10);
		} else if (s.match(/^\d{6}$/)) { // 'YYMMDD' format
			y = parseInt(s.substr(0, 2), 10);
			if (30 <= y && y <= 99) y += 1900;
			else y += 2000;
			m = parseInt(s.substr(2, 2), 10);
			d = parseInt(s.substr(4, 2), 10);
		} else {
			return;
		}
		if (FX.Validator.Date.validate(y, m, d)) return [y,m,d];
	},
	format: function (fmt/*,y, m, d*/) {
		if (undefined == fmt) return;
		if (arguments.length < 4) return;
		var s = fmt;
		var y = arguments[1];
		s = s.replace(/yyyy/, y);
		var y = y % 100;
		s = s.replace(/yy/, (y < 10 ? '0' : '') + y);
		var m = arguments[2];
		s = s.replace(/mm/, (m < 10 ? '0' : '') + m);
		var d = arguments[3];
		s = s.replace(/dd/, (d < 10 ? '0' : '') + d);
		return s;
	},
	fvalue: function (value, pattern) {
		var dt = this.parse(value);
		if (dt) return this.format(pattern || this.pattern, dt[0], dt[1], dt[2]);
	},
	ivalue: function (value) {
		return value.replace(/\-/g, '');
	}
};
FX.Formatter.Time = {
	pattern: 'hh:mm:ss',
	parse: function (t) {
		if (undefined == t) return;
		var h, m, s;
		if (t.match(/^\d{2}:\d{2}:\d{2}$/)) { // 'HH:MM:SS' format
			h = parseInt(t.substr(0, 2), 10);
			m = parseInt(t.substr(3, 2), 10);
			s = parseInt(t.substr(6, 2), 10);
		} else if (t.match(/^\d{6}$/)) { // 'HHMMSS' format
			h = parseInt(t.substr(0, 2), 10);
			m = parseInt(t.substr(2, 2), 10);
			s = parseInt(t.substr(4, 2), 10);
		} else if (t.match(/^\d{2}:\d{2}$/)) { // 'HH:MM' format
			h = parseInt(t.substr(0, 2), 10);
			m = parseInt(t.substr(3, 2), 10);
			s = 0;
		} else if (t.match(/^\d{4}$/)) { // 'HHMM' format
			h = parseInt(t.substr(0, 2), 10);
			m = parseInt(t.substr(2, 2), 10);
			s = 0;
		} else {
			return;
		}
		if (FX.Validator.Time.validate(h, m, s)) return [h,m,s];
	},
	format: function (fmt/*,h, m, s*/) {
		if (undefined == fmt) return;
		if (arguments.length < 4) return;
		var t = fmt;
		var h = arguments[1];
		t = t.replace(/hh/, (h < 10 ? '0' : '') + h);
		var m = arguments[2];
		t = t.replace(/mm/, (m < 10 ? '0' : '') + m);
		var s = arguments[3];
		t = t.replace(/ss/, (s < 10 ? '0' : '') + s);
		return t;
	},
	fvalue: function (value, pattern) {
		var tm = this.parse(value);
		if (tm) return this.format(pattern || this.pattern, tm[0], tm[1], tm[2]);
	},
	ivalue: function (value) {
		return value.replace(/:/g, '');
	}
};
FX.Formatter.Number = {
	parse: function (s) {
		if (undefined == s) return;
		if (s.match(/^-?\d+(\.\d+)?$/)) {
			return s;
		}
	},
	format: function (s) {
		var sign = '';
		s = s.replace(/,/g, ''); //replaceAll(s, ',', '');
		if (s.charAt(0) == '-') {
			sign = '-';
			s = s.substr(1);
		}
		var belowDecimal = '';
		var pos = s.indexOf('.');
		if (pos == -1) {
			pos = s.length;
		} else {
			belowDecimal = s.substr(pos); // include '.'
		}
		var overZero = ''
		while (pos > 3) {
			overZero = ',' + s.substring(pos-3, pos) + overZero;
			pos -= 3;
		}
		if (pos > 0) {
			overZero = s.substring(0, pos) + overZero;
		}
		s = sign + overZero + belowDecimal;
		return s;
	},
	fvalue: function (value) {
		var n = this.parse(value);
		if (n) return this.format(n);
	},
	ivalue: function (value) {
		return value.replace(/,/g, '');
	}
};

/** usage
if (! FX.Validator.Date.date_period(st_dt, en_dt)) { ... }
if ('' != dt && ! FX.Validator.Date.date(dt)) { ... }
if (! FX.Validator.Date.year_period(st_yr, en_yr)) { ... }
if (! FX.Validator.Date.year(yr)) { ... }
if (! FX.Validator.Time.time_period(st_t, en_t)) { ... }
if ('' != t && ! FX.Validator.Time.time(t)) { ... }

if (! FX.Validator.Date.date_period("2009-08-12", "2009-08-17")) { xprintln('date_period'); }
if (! FX.Validator.Date.date("2009-08-12")) { xprintln('date'); }
if (! FX.Validator.Date.year_period("2009", "2010")) { xprintln('year_period'); }
if (! FX.Validator.Date.year("2009")) { xprintln('year'); }
if (! FX.Validator.Time.time_period("19:26:27", "19:28:25")) { xprintln('time_period'); }
if (! FX.Validator.Time.time("19:26:27")) { xprintln('time("'); }
//*/
FX.Validator = {};
FX.Validator.Date = {
	year_min: 2000,
	month_min: 1,
	month_max: 12,
	date_min: 1,
	date_max: function (y, m) {
		if (y < this.year_min) return;
		if (m < this.month_min || this.month_max < m) return;
		var mdaies = [,31,28,31,30,31,30,31,31,30,31,30,31];
		if (2 != m) return mdaies[m];
		if (0 == y%400) return 29;
		if (0 == y%100) return 28;
		if (0 == y%4) return 29;
		return 28;
	},
	year: function (yyyy) {
		if (undefined == yyyy) return;
		if (yyyy.match(/^\d{4}$/)) {
			var y = Number(yyyy);
			if (this.year_min <= y) {
				return true;
			}
		}
		return false;
	},
	year_period: function (st_yyyy, en_yyyy) {
		if (this.year(st_yyyy) && this.year(en_yyyy)) {
			if (st_yyyy <= en_yyyy) {
				return true;
			}
		}
		return false;
	},
	date: function (dt) {
		if (undefined == dt) return;
		var y = undefined;
		var m = undefined;
		var d = undefined;
		if (dt.match(/^\d{4}-\d{2}-\d{2}$/)) { // 'YYYY-MM-DD' format
			y = Number(dt.substr(0, 4));
			m = Number(dt.substr(5, 2));
			d = Number(dt.substr(8, 2));
		} else if (dt.match(/^\d{8}$/)) { // 'YYYYMMDD' format
			y = Number(dt.substr(0, 4));
			m = Number(dt.substr(4, 2));
			d = Number(dt.substr(6, 2));
		}
		if (y && m && d) {
			if (this.year_min <= y) {
				if (this.month_min <= m && m <= this.month_max) {
					if (this.date_min <= d && d <= this.date_max(y, m)) {
						return true;
					}
				}
			}
		}
		return false;
	},
	date_period: function (st_dt, en_dt) {
		if (this.date(st_dt) && this.date(en_dt)) {
			if (st_dt <= en_dt) {
				return true;
			}
		}
		return false;
	},
	validate: function(y, m, d) {
		if (y < this.year_min) return;
		if (m < this.month_min || this.month_max < m) return;
		if (d < this.date_min || this.date_max(y,m) < d) return;
		return true;
	}
};
FX.Validator.Time = {
	hour_min: 0,
	hour_max: 23,
	min_min: 0,
	min_max: 59,
	sec_min: 0,
	sec_max: 59,
	time: function (t) {
		if (undefined == t) return;
		var h = undefined;
		var m = undefined;
		var s = undefined;
		if (t.match(/^\d{2}:\d{2}:\d{2}$/)) { // 'HH:MM:SS' format
			h = Number(t.substr(0, 2));
			m = Number(t.substr(3, 2));
			s = Number(t.substr(6, 2));
		} else if (t.match(/^\d{6}$/)) { // 'HHMMSS' format
			h = Number(t.substr(0, 2));
			m = Number(t.substr(2, 2));
			s = Number(t.substr(4, 2));
		} else if (t.match(/^\d{2}:\d{2}$/)) { // 'HH:MM' format
			h = Number(t.substr(0, 2));
			m = Number(t.substr(3, 2));
			s = 0;
		} else if (t.match(/^\d{4}$/)) { // 'HHMM' format
			h = Number(t.substr(0, 2));
			m = Number(t.substr(2, 2));
			s = 0;
		}
		if (h && m && s) {
			if (this.hour_min <= h && h <= this.hour_max) {
				if (this.min_min <= m && m <= this.min_max) {
					if (this.sec_min <= s && s <= this.sec_max) {
						return true;
					}
				}
			}
		}
		return false;
	},
	time_period: function (st_t, en_t) {
		if (this.time(st_t) && this.time(en_t)) {
			if (st_t <= en_t) {
				return true;
			}
		}
		return false;
	},
	validate: function (h, m, s) {
		if (h < this.hour_min || this.hour_max < h) return;
		if (m < this.min_min || this.min_max < m) return;
		if (s < this.sec_min || this.sec_max < s) return;
		return true;
	}
};

FX.DOM.Format = {
	onfocus: function() {
		var x = this.formatter.ivalue(this.value);
		if (x) this.value = x;
	},
	onblur: function() {
		var x = this.formatter.fvalue(this.value, this.pattern);
		if (x) this.value = x;
	}
};

////////////////////////////////////////
// DOM selector

FX.DomSelector = {
	dom: function (selector) {
		// TODO sophisticated selector
		if (selector.charAt(0) == '#') {
			return this.by_id(selector.substr(1));
		} else if (selector.charAt(0) == '.') {
			return this.by_class(selector.substr(1));
		} else if (selector.charAt(0) == '[' && selector.charAt(selector.length-1) == ']') {
			var kv = selector.substring(1, selector.length-1).split('=');
			if (kv.length == 2 && kv[0] == 'name' && kv[1].length > 0) {
				return this.by_name(kv[1]);
			}
		} else {
			return this.by_tag(selector);
		}
	},
	by_id: function (id) {
		return document.getElementById(id);
	},
	by_class: function (klass) {
		return document.getElementsByClassName(klass);
	},
	by_name: function (name) {
		return document.getElementsByName(name);
	},
	by_tag: function (tag) {
		return document.getElementsByTagName(tag);
	}
};

////////////////////////////////////////
// 

FX.Fx = function (elem) {
	if (typeof elem == "string") {
		elem = FX.DomSelector.dom(elem);
	}
	if (elem) {
		//if (elem.mixin == undefined) elem.mixin = Object.prototype.mixin;
		this.elem = elem;
		this.classer().attributer().enabler().event_handler();
		if (elem.tagName.toLowerCase() == "select") this.selecter();
	}
};
FX.Fx.prototype = {
	classer: function () {
		if (this.elem && this.elem.extends) {
			this.elem.extends(FX.DOM.Klass);
		}
		if (this.extends) {
			this.extends(FX.Klass);
		}
		return this;
	},
	attributer: function () {
		if (this.elem && this.elem.extends) {
			this.elem.extends(FX.DOM.Attribute);
		}
		if (this.extends) {
			this.extends(FX.Attribute);
		}
		return this;
	},
	enabler: function () {
		if (this.elem && this.elem.extends) {
			var enabler_key = undefined;
			var tag_name = this.elem.tagName.toLowerCase();
			if (tag_name == "input") {
				var type_name = this.elem.type;
				if (type_name == "text") {
					enabler_key = FX.DOM.Enable.Text;
				} else if (type_name == "checkbox") {
					enabler_key = FX.DOM.Enable.Checkbox;
				} else if (type_name == "radio") {
					enabler_key = FX.DOM.Enable.Radio;
				}
			} else if (tag_name == "select") {
				//var elem_type = elem.type; // select-one or select-multiple
				enabler_key = FX.DOM.Enable.Select;
			} else if (tag_name == "img") {
				enabler_key = FX.DOM.Enable.Image;
			} else if (tag_name == "textarea") {
				// TODO
			}
			this.elem.extends(FX.DOM.Enable.Default);
			if (enabler_key) {
				this.elem.extends(enabler_key);
			}
		}
		if (this.extends) {
			this.extends(FX.Enable);
		}
		return this;
	},
	event_handler: function () {
		if (this.extends) {
			this.extends(FX.EventHandler);
		}
		return this;
	},
	selecter: function () {
		if (this.elem && this.elem.extends) {
			this.elem.extends(FX.DOM.Select);
		}
		if (this.extends) {
			this.extends(FX.Select);
		}
		return this;
	},
	formatter: function (format, pattern) {
		if (this.elem) {
			var formatter = undefined;
			if ('date' == format) formatter = FX.Formatter.Date;
			if ('time' == format) formatter = FX.Formatter.Time;
			if ('number' == format) formatter = FX.Formatter.Number;
			if (formatter) {
				this.elem.formatter = formatter;
			}
			if (pattern) {
				this.elem.pattern = pattern; // conflict with HTML5
			}
			if (this.bind) {
				this.bind(FX.DOM.Format);
			}
		}
		return this;
	},
	end: function () {
		return this.elem;
	},
	dom: function () {
		return this.elem;
	},
	send: function (fname) {
		if (this.elem && this.elem[fname]) {
			if (arguments.length > 1) {
				var params = [];
				for (var j = 1; j < arguments.length; j++) {
					params.push(arguments[j]);
				}
				this.elem[fname].apply(this.elem, params);
			} else {
				this.elem[fname].call(this.elem);
			}
		} else if (this[fname]) {
			if (arguments.length > 1) {
				var params = [];
				for (var j = 1; j < arguments.length; j++) {
					params.push(arguments[j]);
				}
				this[fname].apply(this, params);
			} else {
				this[fname].apply(this);
			}
		}
	}
};

FX.FxList = function (elems) {
	if (elems && typeof elems == "string") {
		elems = FX.DomSelector.dom(elem);
	}
	if (elems) {
		if (elems.tagName) {
			this.add(new FX.Fx(elems));
		} else if (elems.length != undefined) {
			for (var i = 0; i < elems.length; i++) {
				this.add(new FX.Fx(elems[i]));
			}
		}
	}
};
FX.FxList.prototype = {
	items: [],
	add: function (item) {
		this.items.push(item);
	},
	end: function () {
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if (item && item.end) {
				this.items[i] = item.end();
			}
		}
		return this;
	},
	dom: function () {
		var elems = [];
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if (item && item.dom) {
				elems[i] = item.dom();
			}
		}
		return elems;
	},
	each: function (fname) {
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if (item) {
				item.send.apply(item, arguments);
			}
		}
		return this;
	}
};

function fx(elem) {
	if (elem && typeof elem == "string") {
		elem = FX.DomSelector.dom(elem);
	}
	if (elem) {
		if (elem.tagName) {
			return new FX.Fx(elem);
		} else if (elem.length != undefined) {
			return new FX.FxList(elem);
		}
	}
}
