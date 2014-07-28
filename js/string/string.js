//String.prototype.mixin({
String.includes({
	ltrim: function() {
		if (this.trimLeft) { // 1.8.1
			return this.trimLeft();
		}
		return this.replace(/^\s+/, '');
	},
	rtrim: function() {
		if (this.trimRight) { // 1.8.1
			return this.trimRight();
		}
		return this.replace(/\s+$/, '');
	},
	trim: function() { // pre 1.8.1
		return this.ltrim().rtrim();
	},
	length_in_bytes: function() {
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
	},
	substr_in_bytes: function(offset, length) {
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
		return this.substring(off);;
	},
	lpad: function(size/*, pad*/) {
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
	},
	rpad: function(size/*, pad*/) {
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
	},
	center: function(size/*, pad*/) {
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
	},
	repeat: function(n) {
		var sb = '';
		var s = this.slice(0);
		for (var i = 0; i< n; i++) sb += s;
		return sb;
	}
}, 'only_if_not_exist');