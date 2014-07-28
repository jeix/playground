/** usage
if (! Validator.date.date_period(st_dt, en_dt)) { ... }
if ('' != dt && ! Validator.date.date(dt)) { ... }
if (! Validator.date.year_period(st_yr, en_yr)) { ... }
if (! Validator.date.year(yr)) { ... }
if (! Validator.time.time_period(st_t, en_t)) { ... }
if ('' != t && ! Validator.time.time(t)) { ... }

if (! Validator.date.date_period("2009-08-12", "2009-08-17")) { xprintln('date_period'); }
if (! Validator.date.date("2009-08-12")) { xprintln('date'); }
if (! Validator.date.year_period("2009", "2010")) { xprintln('year_period'); }
if (! Validator.date.year("2009")) { xprintln('year'); }
if (! Validator.time.time_period("19:26:27", "19:28:25")) { xprintln('time_period'); }
if (! Validator.time.time("19:26:27")) { xprintln('time("'); }
//*/
var Validator = {
	date : {
		year_min: 2000,
		month_min: 1,
		month_max: 12,
		date_min: 1,
		date_max: function(y, m) {
			if (y < this.year_min) return;
			if (m < this.month_min || this.month_max < m) return;
			var mdaies = [,31,28,31,30,31,30,31,31,30,31,30,31];
			if (2 != m) return mdaies[m];
			if (0 == y%400) return 29;
			if (0 == y%100) return 28;
			if (0 == y%4) return 29;
			return 28;
		},
		year: function(yyyy) {
			if (undefined == yyyy) return;
			if (yyyy.match(/^\d{4}$/)) {
				var y = Number(yyyy);
				if (this.year_min <= y) {
					return true;
				}
			}
			return false;
		},
		year_period: function(st_yyyy, en_yyyy) {
			if (this.year(st_yyyy) && this.year(en_yyyy)) {
				if (st_yyyy <= en_yyyy) {
					return true;
				}
			}
			return false;
		},
		date: function(dt) {
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
		date_period: function(st_dt, en_dt) {
			if (this.date(st_dt) && this.date(en_dt)) {
				if (st_dt <= en_dt) {
					return true;
				}
			}
			return false;
		}
	},
	time: {
		hour_min: 0,
		hour_max: 23,
		min_min: 0,
		min_max: 59,
		sec_min: 0,
		sec_max: 59,
		time: function(t) {
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
		time_period: function(st_t, en_t) {
			if (this.time(st_t) && this.time(en_t)) {
				if (st_t <= en_t) {
					return true;
				}
			}
			return false;
		}
	}
};
