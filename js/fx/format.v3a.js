var Formatter = {
	date : {
		pattern: 'yyyy-mm-dd',
		parse: function(s) {
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
			if (Formatter.date.validate(y, m, d)) return [y,m,d];
		},
		validate: function(y, m, d) {
			if (y < Validator.date.year_min) return;
			if (m < Validator.date.month_min || Validator.date.month_max < m) return;
			if (d < Validator.date.date_min || Validator.date.date_max(y,m) < d) return;
			return true;
		},
		format: function(fmt/*,y, m, d*/) {
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
		}
	},
	time: {
		pattern: 'hh:mm:ss',
		parse: function(t) {
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
			if (Formatter.time.validate(h, m, s)) return [h,m,s];
		},
		validate: function(h, m, s) {
			if (h < Validator.date.hour_min || Validator.date.hour_max < h) return;
			if (m < Validator.date.min_min || Validator.date.min_max < m) return;
			if (s < Validator.date.sec_min || Validator.date.sec_max < s) return;
			return true;
		},
		format: function(fmt/*,h, m, s*/) {
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
		}
	},
	number: {
		parse: function(s) {
			if (undefined == s) return;
			if (s.match(/^-?\d+(\.\d+)?$/)) {
				return s;
			}
		},
		format: function(s) {
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
		}
	}
};
