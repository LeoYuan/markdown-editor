define(function (require, exports, module) {
	var underscoreConstructor = require('_'),
		_ = new underscoreConstructor;
	var BOLD_RE = /[*_]{2}(.*?)[*_]{2}/g,
		ITALIC_RE = /[*_]{1}([^_*]+)[*_]{1}/g,
		NEWLINE_RE = /\s{2}[\r\n]/g,
		BACK_SLASH_NEWLINE_RE = /```[\r\n]/g,
		CODE_BLOCK_RE = /```([\w\W]+?)```/gm,
		CODE_FRAG_RE = /`([^`]+?)`/g,
		H1_RE = /(#{1})(.*)(?!#)/g,
		H2_RE = /(#{2})(.*)(?!#)/g,
		H3_RE = /(#{3})(.*)(?!#)/g,
		H4_RE = /(#{4})(.*)(?!#)/g,
		H5_RE = /(#{5})(.*)(?!#)/g,
		H6_RE = /(#{6})(.*)(?!#)/g;

	var parsers = {
		doBold: function(str) {
			str = str.replace(BOLD_RE, '<strong>$1</strong>');
			return str;
		},
		doItalic: function(str) {
			str = str.replace(ITALIC_RE, '<em>$1</em>');
			return str;
		},
		doBackSlashNewline: function(str) {
			str = str.replace(BACK_SLASH_NEWLINE_RE, '```');
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
		doNewline: function(str) {
			str = str.replace(NEWLINE_RE, '<br>');
			return str;
		}
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