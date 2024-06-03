import { App, FunctionPlugin, createApp } from 'vue'
import Dap from 'dap-util'
import dialogComponent from './dialog.vue'
import dialogPcComponent from './dialog-pc.vue'
import { DialogPcPropsType, DialogPropsType } from './props'

export type DialogType = {
	initParams: (type: DialogPropsType['type'] | DialogPcPropsType['type'], options: string | DialogPropsType | DialogPcPropsType) => DialogPropsType | DialogPcPropsType
	alert: (options: string | DialogPropsType) => Promise<void>
	confirm: (options: string | DialogPropsType) => Promise<boolean>
	prompt: (options: string | DialogPropsType) => Promise<{ ok: boolean; value: string }>
	Alert: (options: string | DialogPcPropsType) => Promise<void>
	Confirm: (options: string | DialogPcPropsType) => Promise<boolean>
	Prompt: (options: string | DialogPcPropsType) => Promise<{ ok: boolean; value: string }>
}

const Dialog: DialogType = {
	//初始化参数
	initParams: (type, options) => {
		let opts: DialogPropsType | DialogPcPropsType = {}
		if (Dap.common.isObject(options)) {
			opts.title = (<DialogPropsType | DialogPcPropsType>options).title
			opts.message = (<DialogPropsType | DialogPcPropsType>options).message
			opts.width = (<DialogPropsType | DialogPcPropsType>options).width
			opts.zIndex = (<DialogPropsType | DialogPcPropsType>options).zIndex
			opts.animation = (<DialogPropsType | DialogPcPropsType>options).animation
			opts.radius = (<DialogPropsType | DialogPcPropsType>options).radius
			opts.overlayColor = (<DialogPropsType | DialogPcPropsType>options).overlayColor
			opts.closable = (<DialogPropsType | DialogPcPropsType>options).closable
			opts.input = (<DialogPropsType | DialogPcPropsType>options).input
			opts.usePadding = (<DialogPropsType | DialogPcPropsType>options).usePadding
			opts.mountEl = (<DialogPropsType | DialogPcPropsType>options).mountEl
			opts.timeout = (<DialogPropsType | DialogPcPropsType>options).timeout
			if (type == 'alert' || type == 'confirm' || type == 'prompt') {
				;(<DialogPropsType>opts).btnText = (<DialogPropsType>options).btnText
				;(<DialogPropsType>opts).btnColor = (<DialogPropsType>options).btnColor
				;(<DialogPropsType>opts).ios = (<DialogPropsType>options).ios
			} else if (type == 'Alert' || type == 'Confirm' || type == 'Prompt') {
				;(<DialogPcPropsType>opts).center = (<DialogPcPropsType>options).center
				;(<DialogPcPropsType>opts).btns = (<DialogPcPropsType>options).btns
				;(<DialogPcPropsType>opts).showTimes = (<DialogPcPropsType>options).showTimes
			}
		} else {
			opts.message = <string>options
		}
		opts.type = type
		return opts
	},

	//提示框
	alert: function (options) {
		return new Promise<void>(resolve => {
			let opts = Dialog.initParams('alert', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})

			const _app = <App>(<unknown>this)

			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//确认框
	confirm: function (options) {
		return new Promise<boolean>(resolve => {
			let opts = Dialog.initParams('confirm', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				__remove: (ok: boolean) => {
					instance.unmount()
					mountNode.remove()
					resolve(ok)
				}
			})

			const _app = <App>(<unknown>this)
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//信息输入框
	prompt: function (options) {
		return new Promise<{ ok: boolean; value: string }>(resolve => {
			let opts = Dialog.initParams('prompt', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				__remove: (ok: boolean, value: string) => {
					instance.unmount()
					mountNode.remove()
					resolve({
						ok,
						value
					})
				}
			})

			const _app = <App>(<unknown>this)
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端提示框
	Alert: function (options) {
		return new Promise<void>(resolve => {
			let opts = Dialog.initParams('Alert', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})

			const _app = <App>(<unknown>this)
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端确认框
	Confirm: function (options) {
		return new Promise<boolean>(resolve => {
			let opts = Dialog.initParams('Confirm', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				__remove: (ok: boolean) => {
					instance.unmount()
					mountNode.remove()
					resolve(ok)
				}
			})

			const _app = <App>(<unknown>this)
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端信息输入框
	Prompt: function (options) {
		return new Promise<{ ok: boolean; value: string }>(resolve => {
			let opts = Dialog.initParams('Prompt', options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				__remove: (ok: boolean, value: string) => {
					instance.unmount()
					mountNode.remove()
					resolve({
						ok,
						value
					})
				}
			})

			const _app = <App>(<unknown>this)
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	}
}

const install: FunctionPlugin = (app: App) => {
	//将提示框挂载到全局
	app.config.globalProperties.$alert = Dialog.alert.bind(app)
	app.provide('$alert', Dialog.alert.bind(app))

	//将确认框挂载到全局
	app.config.globalProperties.$confirm = Dialog.confirm.bind(app)
	app.provide('$confirm', Dialog.confirm.bind(app))

	//将信息输入框挂载到全局
	app.config.globalProperties.$prompt = Dialog.prompt.bind(app)
	app.provide('$prompt', Dialog.prompt.bind(app))

	//将PC端提示框挂载到全局
	app.config.globalProperties.$Alert = Dialog.Alert.bind(app)
	app.provide('$Alert', Dialog.Alert.bind(app))

	//将PC端确认框挂载到全局
	app.config.globalProperties.$Confirm = Dialog.Confirm.bind(app)
	app.provide('$Confirm', Dialog.Confirm.bind(app))

	//将PC端信息输入框挂载到全局
	app.config.globalProperties.$Prompt = Dialog.Prompt.bind(app)
	app.provide('$Prompt', Dialog.Prompt.bind(app))
}

export { Dialog, install as default }
