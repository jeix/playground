
/**
 * XML DOM 유틸리티
 */
var XmlDomUtil = {
	DEEP_CLONE: true // deep clone 여부
};

/**
 * URL을 읽어 XML DOM Document를 생성한다.
 */
XmlDomUtil.loadXMLDoc = function (fname) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", fname, false);
	xhr.send();
	return xhr.responseXML;
}

/**
 * 문자열을 파싱해서 XML DOM Document를 생성한다.
 */
XmlDomUtil.loadXMLStr = function (txt) {
	var parser = new DOMParser();
	return parser.parseFromString(txt, "text/xml");
}

/**
 * 노드를 포함하는 XML DOM Document를 생성한다.
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
 * 엘리먼트들에 에리먼트를 추가한다.
 * 정렬 기준이 있으면 비교해서 적당한 위치에 넣는다.
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
 * 노드에서 태그명에 해당하는 엘리먼트들을 찾는다.
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
 * 노드에 엘리먼트를 추가한다.
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
 * 비교대상 속성이 동일한 엘리먼트를 찾는다.
 */
XmlDomUtil.findEqualElement = function (elemNeedle, elemsHaystack, attrNames) {
	var ix = this.findEqualElementIndex(elemNeedle, elemsHaystack, attrNames);
	if (ix >= 0) {
		return elemsHaystack[ix];
	}
};

/**
 * 비교대상 속성이 동일한 엘리먼트의 위치를 찾는다.
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
 * 엘리먼트를 비교한다.
 * 비교대상 속성 값을 비교해서
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
 * 엘리먼트들을 복제한다.
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
 * 노드들을 복제한다.
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
 * 노드를 복제한다.
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
 * 노드목록에서 노드의 위치를 바꾼다.
 * @param from 인덱스
 * @param to 인덱스
 */
XmlDomUtil.moveNodePosition = function (nodes, from, to) {
	var node = nodes[from];
	nodes.splice(from, 1);
	nodes.splice(to, 0, node);
};

/**
 * 비교대상 속성들이 동일한 엘리먼트를 찾는다.
 */
XmlDomUtil.findElement = function (elems, attrs) {
	var ix = this.findElementIndex(elems, attrs);
	if (ix >= 0) {
		return elems[ix];
	}
};

/**
 * 비교대상 속성들이 동일한 엘리먼트의 위치를 찾는다.
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
