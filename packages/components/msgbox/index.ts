import Dap from 'dap-util'
import { App, createApp } from 'vue'
import MsgboxComponent from './msgbox.vue'
import { MsgboxPropsType } from './props'
export type * from './props'

type MsgboxType = {
	initParams: (options: string | MsgboxPropsType) => MsgboxPropsType
	install: (app: App) => void
	msgbox: (options: string | MsgboxPropsType) => Promise<void>
}

const Msgbox: MsgboxType = {
	//初始化参数
	initParams: options => {
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

	//安装函数
	install: app => {
		app.config.globalProperties.$msgbox = Msgbox.msgbox
		app.provide('$msgbox', Msgbox.msgbox)
	},

	//弹窗调用
	msgbox: options => {
		return new Promise<void>(resolve => {
			let opts = Msgbox.initParams(options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
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
	}
}

export { Msgbox, Msgbox as default }
