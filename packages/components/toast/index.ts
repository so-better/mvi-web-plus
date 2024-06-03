import { App, ComponentInternalInstance, FunctionPlugin, createApp } from 'vue'
import Dap from 'dap-util'
import ToastComponent from './toast.vue'
import { ToastPropsType } from './props'

type ToastType = {
	//挂载的dom
	$el?: HTMLElement
	//创建的应用实例
	$instance?: App<Element>
	//组件实例
	$vm?: ComponentInternalInstance
	initParams: (options: string | ToastPropsType) => ToastPropsType
	showToast: (options: string | ToastPropsType) => Promise<void>
	hideToast: () => void
}

const Toast: ToastType = {
	//初始化参数
	initParams: options => {
		let opts: ToastPropsType = {}
		if (Dap.common.isObject(options)) {
			opts.type = (<ToastPropsType>options).type
			opts.message = (<ToastPropsType>options).message
			opts.timeout = (<ToastPropsType>options).timeout
			opts.overlayColor = (<ToastPropsType>options).overlayColor
			opts.background = (<ToastPropsType>options).background
			opts.color = (<ToastPropsType>options).color
			opts.zIndex = (<ToastPropsType>options).zIndex
			opts.usePadding = (<ToastPropsType>options).usePadding
			opts.icon = (<ToastPropsType>options).icon
			opts.mountEl = (<ToastPropsType>options).mountEl
			opts.shadow = (<ToastPropsType>options).shadow
		} else {
			opts.message = <string>options
			opts.timeout = 1500
		}
		return opts
	},

	//显示toast
	showToast: options => {
		return new Promise<void>(resolve => {
			//如果已经存在弹窗，则关闭后再进行
			if (Toast.$el && Toast.$instance) {
				Toast.$instance.unmount()
				Toast.$el.remove()
			}
			let opts = Toast.initParams(options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(ToastComponent, {
				...opts,
				__init: (vm: ComponentInternalInstance) => {
					//获取组件实例进行保存
					Toast.$vm = vm
				},
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			instance.mount(mountNode)
			//保存应用实例和应用所挂载的元素
			Toast.$el = mountNode
			Toast.$instance = instance
		})
	},

	//关闭Toast
	hideToast: () => {
		if (Toast.$vm) {
			Toast.$vm.exposed!.show.value = false
		}
	}
}

const install: FunctionPlugin = (app: App) => {
	app.config.globalProperties.$showToast = Toast.showToast
	app.provide('$showToast', Toast.showToast)

	app.config.globalProperties.$hideToast = Toast.hideToast
	app.provide('$hideToast', Toast.hideToast)
}

export { Toast, install as default }
