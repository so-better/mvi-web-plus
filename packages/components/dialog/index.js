import { createApp } from 'vue'
import { Dap } from '../dap'
import dialogComponent from './dialog.vue'
import dialogPcComponent from './dialog-pc.vue'

const Dialog = {
	//初始化参数
	initParams: (type, options) => {
		let opts = {}
		if (Dap.common.isObject(options)) {
			opts.title = options.title
			opts.message = options.message
			opts.width = options.width
			opts.zIndex = options.zIndex
			opts.usePadding = options.usePadding
			opts.animation = options.animation
			opts.radius = options.radius
			opts.timeout = options.timeout
			opts.overlayColor = options.overlayColor
			opts.mountEl = options.mountEl
			opts.closable = options.closable
			if (type == 'alert' || type == 'confirm' || type == 'prompt') {
				opts.btnText = options.btnText
				opts.btnColor = options.btnColor
				opts.ios = options.ios
				opts.input = {
					placeholder: options.placeholder,
					type: options.type,
					autofocus: options.autofocus,
					maxlength: options.maxlength,
					clearable: options.clearable,
					mode: options.mode,
					align: options.align,
					value: options.value
				}
			} else if (type == 'Alert' || type == 'Confirm' || type == 'Prompt') {
				opts.btns = options.btns
				opts.showTimes = options.showTimes
				opts.input = {
					placeholder: options.placeholder,
					type: options.type,
					autofocus: options.autofocus,
					maxlength: options.maxlength,
					clearable: options.clearable,
					align: options.align,
					value: options.value
				}
			}
		} else {
			opts.message = options
		}
		opts.type = type
		return opts
	},

	//提示框
	alert: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('alert', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//确认框
	confirm: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('confirm', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				remove: ok => {
					instance.unmount()
					mountNode.remove()
					resolve(ok)
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//信息输入框
	prompt: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('prompt', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogComponent, {
				...opts,
				remove: (ok, value) => {
					instance.unmount()
					mountNode.remove()
					resolve({
						ok,
						value
					})
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端提示框
	Alert: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('Alert', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端确认框
	Confirm: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('Confirm', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				remove: ok => {
					instance.unmount()
					mountNode.remove()
					resolve(ok)
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//pc端信息输入框
	Prompt: function (options) {
		return new Promise((resolve, reject) => {
			let opts = Dialog.initParams('Prompt', options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(dialogPcComponent, {
				...opts,
				remove: (ok, value) => {
					instance.unmount()
					mountNode.remove()
					resolve({
						ok,
						value
					})
				}
			})
			//将页面应用实例的监听事件传递给当前弹窗组件的应用实例
			if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == 'function') {
				instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch
			}
			instance.mount(mountNode)
		})
	},

	//注册函数
	install: app => {
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
}

export { Dialog, Dialog as default }
