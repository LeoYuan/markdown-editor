define(function (require, exports, module) {
	var $ = require('$');
	var mdConverter = require('./converter');
	var ret = '';

	//debugger;
	$('#input').keyup(function() {
		ret = mdConverter.convert($(this).val());
		$('#output').html(ret);
	}).focus();


});