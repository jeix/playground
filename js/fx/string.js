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