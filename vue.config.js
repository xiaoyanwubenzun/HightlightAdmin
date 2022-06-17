module.exports = {
	publicPath: "./",
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8080,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
	},
	pwa: {
		iconPaths: {
			favicon32: 'titlehead.png',
			favicon16: 'titlehead.png',
			appleTouchIcon: 'titlehead.png',
			maskIcon: 'titlehead.png',
			msTileImage: 'titlehead.png'
		}
	},
	chainWebpack: config => {
		config.optimization.delete('splitChunks');
		// 移除 prefetch 插件
		// config.plugins.delete('preload');
		// config.plugins.delete('prefetch');

		// 或者
		// 修改它的选项：
		// config.plugin('prefetch').tap(options => {
		//   options[0].fileBlacklist = options[0].fileBlacklist || []
		//   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
		//   return options
		// })
	},
	// pages: {
	//     ui: {
	//       // page 的入口
	//       entry: "./src/main.js",
	//       // 模板来源
	//       template: "./public/index.html",
	//       // 在 dist/index.html 的输出
	//       filename: "index.html",
	//       // 当使用 title 选项时，
	//       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	//       title: "Index Page",
	//       // 在这个页面中包含的块，默认情况下会包含
	//       // 提取出来的通用 chunk 和 vendor chunk。
	//       chunks: ["chunk-vendors", "chunk-common", "ui"]
	//     },
	//     // hh: {
	//     //   // page 的入口
	//     //   entry: "src/views/ui/main.js",
	//     //   // 模板来源
	//     //   template: "public/ui.html",
	//     //   // 在 dist/index.html 的输出
	//     //   filename: "ui.html",
	//     //   // 当使用 title 选项时，
	//     //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	//     //   title: "Index Page",
	//     //   // 在这个页面中包含的块，默认情况下会包含
	//     //   // 提取出来的通用 chunk 和 vendor chunk。
	//     //   chunks: ["chunk-vendors", "chunk-common", "hh"]
	//     // },
	//     // 当使用只有入口的字符串格式时，
	//     // 模板会被推导为 `public/subpage.html`
	//     // 并且如果找不到的话，就回退到 `public/index.html`。
	//     // 输出文件名会被推导为 `subpage.html`。
	//     // subpage: "src/subpage/main.js"
	//   }
}