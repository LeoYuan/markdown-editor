seajs.config({

	// jQuery 的 shim 配置
	alias: {
    '$': {
      src: 'jquery-1.9.1.js',
      exports: 'jQuery'
    }
	},

	// 插件
  plugins: ['nocache', 'shim'],

  // 调试模式
  debug: true,
});

