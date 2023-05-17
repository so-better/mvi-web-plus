import { createApp } from 'vue'
import { Dap } from '../dap'
import MsgboxComponent from './msgbox.vue'

const Msgbox = {
	//初始化参数
	initParams: options => {
		let opts = {}
		if (Dap.common.isObject(options)) {
			opts.message = options.message
			opts.timeout = options.timeout
			opts.animation = options.animation
			opts.zIndex = options.zIndex
			opts.color = options.color
			opts.background = options.background
		} else {
			opts.message = options
		}
		return opts
	},

	//弹窗调用
	msgbox: options => {
		return new Promise((resolve, reject) => {
			let opts = Msgbox.initParams(options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(MsgboxComponent, {
				...opts,
				remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			instance.mount(mountNode)
		})
	},

	//注册函数
	install: app => {
		app.config.globalProperties.$msgbox = Msgbox.msgbox
		app.provide('$msgbox', Msgbox.msgbox)
	}
}

export { Msgbox, Msgbox as default }
