import { Plugin } from 'vite'
import { resolve, parse, dirname } from 'path'
import fs from 'fs'
import less from 'less'

type PluginOptionType = {
	include: string[]
	outputDir: string
}

export default (options: PluginOptionType) => {
	const { include, outputDir } = options
	//编译less为css的函数
	const compile = (lessPath: string, cssPath: string) => {
		//读取less文件内容
		const lessContent = fs.readFileSync(lessPath, 'utf-8')
		//编译
		less.render(
			lessContent,
			{
				// 确保可以解析 @import 语句
				paths: [dirname(lessPath)]
			},
			(err, output) => {
				//处理失败
				if (err || !output) {
					console.error(`Failed to compile LESS for ${lessPath}`)
					return
				}
				//写入css文件
				fs.writeFileSync(cssPath, output.css, 'utf-8')
				console.log(`Compiled LESS for ${lessPath} to ${cssPath}`)
			}
		)
	}
	return <Plugin>{
		name: 'vite-plugin-compile-less-to-css',
		buildEnd() {
			//遍历less文件地址数组
			include.forEach(lessPath => {
				//获取文件名（不带扩展名）
				const { name } = parse(lessPath)
				//构建CSS文件的输出路径
				const cssPath = resolve(outputDir, `${name}.css`)
				//编译 LESS 到 CSS
				compile(lessPath, cssPath)
			})
		}
	}
}
