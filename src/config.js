seajs.config({

	// jQuery 的 shim 配置
	alias: {
    '$': {
      src: 'jquery-1.9.1.js',
      exports: 'jQuery'
    },
    '_': {
    	src: 'underscore.js',
    	exports: '_'
    }
	},

	// 插件
  plugins: ['nocache', 'shim'],

  // 调试模式
  debug: true,
});

