var $ = function(id) { return document.getElementById(id); };
var $N = function(name) { return document.getElementsByName(name); };
var $T = function(tag) { return document.getElementsByTagName(tag); };

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

function debug(s) {
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
}

/*
Object.prototype.mixin = function(o) {
	if (o) {
		var only_if_not_exist = arguments[1];
		if (only_if_not_exist) {
			for (var k in o) {
				if (o.hasOwnProperty(k)) {
					if (!this[k]) {
						this[k] = o[k];
					}
				}
			}
		} else {
			for (var k in o) {
				if (o.hasOwnProperty(k)) {
					if (this[k] != o[k]) {
						this[k] = o[k];
					}
				}
			}
		}
	}
};
//*/

Function.$include = function (from, to) {
	var only_if_not_exist = arguments[2];
	if (only_if_not_exist) {
		for (var k in from) {
			if (from.hasOwnProperty(k) && !to[k]) {
				to[k] = from[k];
			}
		}
		return;
	}
	for (var k in from) {
		if (from.hasOwnProperty(k)) {
			to[k] = from[k];
		}
	}
};

Function.prototype.includes = function (o) {
	var only_if_not_exist = arguments[1];
	if (only_if_not_exist) {
		Function.$include(o, this.prototype, only_if_not_exist);
		return;
	}
	Function.$include(o, this.prototype);
};
Function.prototype.extends = function (o) {
	Function.$include(o, this);
};
