
/**
 * XML DOM ��ƿ��Ƽ
 */
var XmlDomUtil = {
	DEEP_CLONE: true // deep clone ����
};

/**
 * URL�� �о� XML DOM Document�� �����Ѵ�.
 */
XmlDomUtil.loadXMLDoc = function (fname) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", fname, false);
	xhr.send();
	return xhr.responseXML;
}

/**
 * ���ڿ��� �Ľ��ؼ� XML DOM Document�� �����Ѵ�.
 */
XmlDomUtil.loadXMLStr = function (txt) {
	var parser = new DOMParser();
	return parser.parseFromString(txt, "text/xml");
}

/**
 * ��带 �����ϴ� XML DOM Document�� �����Ѵ�.
 */
XmlDomUtil.createDocument = function (rootNode) {
	if (rootNode) {
		//var tagName = rootNode.tagName.toUpperCase();
		//var doc = new DOMParser().parseFromString("<" + tagName + "></" + tagName + ">", "text/xml")
		var doc = document.implementation.createDocument("", rootNode.tagName, null);
		var attrs = rootNode.attributes;
		for (var i = 0; i < attrs.length; i++) {
			var attr = attrs.item(i);
			doc.documentElement.setAttribute(attr.nodeName, attr.nodeValue);
		}
		var nodes = rootNode.childNodes;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes.item(i);
			if (node.nodeType == 1) {
				doc.documentElement.appendChild(node);
			}
		}
		return doc;
	}
};

/**
 * ������Ʈ�鿡 ������Ʈ�� �߰��Ѵ�.
 * ���� ������ ������ ���ؼ� ������ ��ġ�� �ִ´�.
 */
XmlDomUtil.insert = function (elems, elem, sortBy) {
	if (sortBy) {
		var isNumberedSortBy = false;
		var sortByAttr = elem.getAttribute(sortBy);
		if (/^[0-9]+$/.test(sortByAttr)) {
			isNumberedSortBy = true;
			sortByAttr = Number(sortByAttr);
		}
		var size = elems.length;
		for (var i = 0 ; i < size; i++) {
			if (isNumberedSortBy) {
				if (sortByAttr < Number(elems[i].getAttribute(sortBy))) {
					elems.splice(i, 0, elem);
					return elems;
				}
			} else {
				if (sortByAttr < elems[i].getAttribute(sortBy)) {
					elems.splice(i, 0, elem);
					return elems;
				}
			}
		}
		elems.push(elem);
	} else {
		elems.push(elem);
	}
	return elems;
};

/**
 * ��忡�� �±׸� �ش��ϴ� ������Ʈ���� ã�´�.
 */
XmlDomUtil.childElementsByTagName = function (elem, tagName) {
	var elems = [];
	if (elem) {
		var children = elem.childNodes;
		var size = children.length;
		for (var i = 0 ; i < size; i++) {
			var child = children.item(i);
			if (child.nodeType == 1 && child.tagName.toUpperCase() == tagName) {
				elems.push(child);
			}
		}
	}
	return elems;
};

/**
 * ��忡 ������Ʈ�� �߰��Ѵ�.
 */
XmlDomUtil.appendElements = function (elem, elems) {
	if (elem && elems && elems.length) {
		var size = elems.length;
		for (var i = 0; i < size; i++) {
			elem.appendChild(elems[i]);
		}
	}
};

/**
 * �񱳴�� �Ӽ��� ������ ������Ʈ�� ã�´�.
 */
XmlDomUtil.findEqualElement = function (elemNeedle, elemsHaystack, attrNames) {
	var ix = this.findEqualElementIndex(elemNeedle, elemsHaystack, attrNames);
	if (ix >= 0) {
		return elemsHaystack[ix];
	}
};

/**
 * �񱳴�� �Ӽ��� ������ ������Ʈ�� ��ġ�� ã�´�.
 */
XmlDomUtil.findEqualElementIndex = function (elemNeedle, elemsHaystack, attrNames) {
	var size = elemsHaystack.length;
	for (var i = 0; i < size; i++) {
		if (this.compareElement(elemNeedle, elemsHaystack[i], attrNames) == 0) {
			return i;
		}
	}
	return -1;
};

/**
 * ������Ʈ�� ���Ѵ�.
 * �񱳴�� �Ӽ� ���� ���ؼ�
 */
XmlDomUtil.compareElement = function (elem1, elem2, attrNames) {
	var size = attrNames.length;
	for (var i = 0; i < size; i++) {
		var attrName = attrNames[i];
		var attrVal1 = elem1.getAttribute(attrName);
		var attrVal2 = elem2.getAttribute(attrName);
		if (attrVal1 > attrVal2) return 1;
		if (attrVal1 < attrVal2) return -1;
	}
	return 0;
};

/**
 * ������Ʈ���� �����Ѵ�.
 */
XmlDomUtil.cloneElements = function (elems, deepClone) {
	var cloned = [];
	if (elems && elems.length) {
		var size = elems.length;
		for (var i = 0; i < size; i++) {
			cloned.push(elems[i].cloneNode(deepClone ? true : false));
		}
	}
	return cloned;
};

/**
 * ������ �����Ѵ�.
 */
XmlDomUtil.cloneNodes = function (nodes) {
	var cloned = [];
	if (nodes && nodes.length) {
		var size = nodes.length;
		for (var i = 0; i < size; i++) {
			cloned.push(this.cloneNode(nodes[i]));
		};
	}
	return cloned;
};

/**
 * ��带 �����Ѵ�.
 */
ProductXmlCoverageReorder.cloneNode = function (node, childLeafTags, childTags) {
	if (node) {
		var cloned = node.cloneNode(false);	
		if (childLeafTags && childLeafTags.length) {
			var tagSize = childLeafTags.length;
			for (var i = 0; i < tagSize; i++) {
				var childLeafTag = childLeafTags[i];
				var childElems = this.childElementsByTagName(node, childLeafTag);
				this.appendElements(cloned, this.cloneElements(childElems, this.DEEP_CLONE));
			}
		}
		if (childTags && childTags.length) {
			var tagSize = childTags.length;
			for (var i = 0; i < tagSize; i++) {
				var childTag = childTags[i];
				var childElems = this.childElementsByTagName(node, childTag);
				var elemSize = childElems.length;
				for (var j = 0; j < elemSize; j++) {
					cloned.appendChild(this.cloneNode(childElems[j])); // recursive
				}
			}
		}
		return cloned;
	}
};

/**
 * ����Ͽ��� ����� ��ġ�� �ٲ۴�.
 * @param from �ε���
 * @param to �ε���
 */
XmlDomUtil.moveNodePosition = function (nodes, from, to) {
	var node = nodes[from];
	nodes.splice(from, 1);
	nodes.splice(to, 0, node);
};

/**
 * �񱳴�� �Ӽ����� ������ ������Ʈ�� ã�´�.
 */
XmlDomUtil.findElement = function (elems, attrs) {
	var ix = this.findElementIndex(elems, attrs);
	if (ix >= 0) {
		return elems[ix];
	}
};

/**
 * �񱳴�� �Ӽ����� ������ ������Ʈ�� ��ġ�� ã�´�.
 */
XmlDomUtil.findElementIndex = function (elems, attrs) {
	var attrNames = [];
	var attrVals = [];
	for (var k in attrs) {
		if (attrs.hasOwnProperty(k)) {
			attrNames.push(k);
			attrVals.push(attrs[k]);
		}
	}
	var elemSize = elems.length;
	for (var i = 0; i < elemSize; i++) {
		var elem = elems[i];
		var passed = 0;
		var attrSize = attrNames.length;
		for (var j = 0; j < attrSize; j++) {
			var attrName = attrNames[j];
			var attrValExpected = attrVals[j];
			var attrVal = elem.getAttribute(attrName);
			if (attrVal == attrValExpected) {
				passed++;
			} else {
				break;
			}
		}
		if (attrSize == passed) {
			return i;
		}
	}
	return -1;
};
