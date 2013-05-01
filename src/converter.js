define(function (require, exports, module) {
	var underscoreConstructor = require('_'),
		_ = new underscoreConstructor;
	var BOLD_RE = /[*_]{2}(.*?)[*_]{2}/g,
		ITALIC_RE = /[*_]{1}([^_*\s]+)[*_]{1}/g,
		NEWLINE_RE = /[\r\n]/g,
		CODE_BLOCK_RE = /```[\r\n]?([\w\W]+?)```[\r\n]?/g,
		CODE_FRAG_RE = /`([^`\r\n]+?)`/g,
		H1_RE = /(#{1})(.*)(?!#)[\r\n]?/g,
		H2_RE = /(#{2})(.*)(?!#)[\r\n]?/g,
		H3_RE = /(#{3})(.*)(?!#)[\r\n]?/g,
		H4_RE = /(#{4})(.*)(?!#)[\r\n]?/g,
		H5_RE = /(#{5})(.*)(?!#)[\r\n]?/g,
		H6_RE = /(#{6})(.*)[\r\n]?/g,
		UNORDERED_LIST_RE = /\*\s*([\w\W]+?)[\r\n]{2}/g,
		ORDERED_LIST_RE = /\d+\.\s*([\w\W]+?)[\r\n]{2}/g,
		LINK_RE = /\[(\w+)\]\(([\w\W]+?)\)[\r\n]?/g,
		IMAGE_RE = /!\[(\w+)\]\(([\w\W]+?)\)[\r\n]?/g;

	var parsers = {
		doBold: function(str) {
			str = str.replace(BOLD_RE, '<strong>$1</strong>');
			return str;
		},
		doItalic: function(str) {
			str = str.replace(ITALIC_RE, '<em>$1</em>');
			return str;
		},
		doCodeBlock: function(str) {
			str = str.replace(CODE_BLOCK_RE, '<pre><code>$1</code></pre>');
			return str;
		},
		doCodeFrag: function(str) {
			str = str.replace(CODE_FRAG_RE, '<code>$1</code>');
			return str;
		},
		doH6: function(str) {
			str = str.replace(H6_RE, '<h6>$2</h6>');
			return str;
		},
		doH5: function(str) {
			str = str.replace(H5_RE, '<h5>$2</h5>');
			return str;
		},
		doH4: function(str) {
			str = str.replace(H4_RE, '<h4>$2</h5>');
			return str;
		},
		doH3: function(str) {
			str = str.replace(H3_RE, '<h3>$2</h3>');
			return str;
		},
		doH2: function(str) {
			str = str.replace(H2_RE, '<h2>$2</h2>');
			return str;
		},
		doH1: function(str) {
			str = str.replace(H1_RE, '<h1>$2</h1>');
			return str;
		},
		doUnorderedList: function(str) {
			str = str.replace(UNORDERED_LIST_RE, function(whole) {
				//console.log('before ' + whole);
				whole = whole.replace(/[\r\n]/g, ' ');
				//console.log('after ' + whole);
				var temp = '<ul>';
				var lis = whole.split(/\*\s*/);
				////console.log('lis -> ' + lis);
				for (var i = 1, leni = lis.length; i < leni; i++) {
					temp += '<li>' + lis[i] + '</li>';
				}
				temp += '</ul>';
				return temp;
			});
			
			return str;
		},
		doOrderedList: function(str) {
			str = str.replace(ORDERED_LIST_RE, function(whole) {
				//console.log(whole);
				whole = whole.replace(/[\r\n]/g, ' ');
				var temp = '<ol>';
				var lis = whole.split(/\d+\./);
				//console.log('lis -> ' + lis);
				for (var i = 1, leni = lis.length; i < leni; i++) {
					temp += '<li>' + lis[i] + '</li>';
				}
				temp += '</ol>';
				return temp;
			});
			
			return str;
		},
		doImage: function(str) {
			str = str.replace(IMAGE_RE, function(whole, hint, src) {
				//<img src="https://f.cloud.github.com/assets/1195765/444915/f5328572-b1ae-11e2-988f-a6ce7650b00b.png" alt="git" style="max-width:100%;">
				return "<img src='" + src + "' alt='" + hint + "' style='max-width:100%;'></img>";
			});
			return str;
		},
		doLink: function(str) {
			str = str.replace(LINK_RE, function(whole, text, urlAndTitle) {
				var url, title;
				if (urlAndTitle.indexOf(' ') != -1) {
					url = urlAndTitle.split(/\s/)[0];
					title = urlAndTitle.split(/\s/)[1].replace(/['"]?([\w\W+])['"]?/, "$1");
					return '<a href="' + url + '" title="' + title + '">' + text + '</a>';
				}
				return '<a href="' + urlAndTitle + '">' + text + '</a>';
			});
			return str;
		},
		doNewline: function(str) {
			str = str.replace(NEWLINE_RE, '<br>');
			return str;
		}
	}

	function replaceNewline(str) {
		str = str.replace(/[\r\n]/g, '');
		return str + '\r';
	}

	function convert(str, opts) {
		var parserName, parserFunc;
		for (parserName in parsers) {
			str = parsers[parserName](str);
		}
		return str;
	}

	exports.convert = convert;
});