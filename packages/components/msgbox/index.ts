import { App, createApp } from 'vue'
import Dap from 'dap-util'
import MsgboxComponent from './msgbox.vue'
import { MsgboxPropsType } from './props'

type MsgboxType = {
	initParams: (options: string | MsgboxPropsType) => MsgboxPropsType
	msgbox: (options: string | MsgboxPropsType) => void
	install: (app: App) => void
}

const Msgbox: MsgboxType = {
	//初始化参数
	initParams: (options: string | MsgboxPropsType) => {
		let opts: MsgboxPropsType = {}
		if (Dap.common.isObject(options)) {
			opts.message = (<MsgboxPropsType>options).message
			opts.timeout = (<MsgboxPropsType>options).timeout
			opts.animation = (<MsgboxPropsType>options).animation
			opts.zIndex = (<MsgboxPropsType>options).zIndex
			opts.color = (<MsgboxPropsType>options).color
			opts.background = (<MsgboxPropsType>options).background
		} else {
			opts.message = <string>options
		}
		return opts
	},

	//弹窗调用
	msgbox: (options: string | MsgboxPropsType) => {
		return new Promise<void>(resolve => {
			let opts = Msgbox.initParams(options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(MsgboxComponent, {
				...opts,
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			instance.mount(mountNode)
		})
	},

	//注册函数
	install: (app: App) => {
		app.config.globalProperties.$msgbox = Msgbox.msgbox
		app.provide('$msgbox', Msgbox.msgbox)
	}
}

export { Msgbox, Msgbox as default }
