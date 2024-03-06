import { App, ComponentInternalInstance, createApp } from 'vue'
import Dap from 'dap-util'
import NotifyComponent from './notify.vue'

interface NotifyType {
	//挂载的dom
	$el?: HTMLElement
	//创建的应用实例
	$instance?: App<Element>
	//组件实例
	$vm?: ComponentInternalInstance
	initParams: (options: any) => any
	showNotify: (options: any) => void
	hideNotify: () => void
	install: (app: App) => void
}

const Notify: NotifyType = {
	//初始化参数
	initParams: (options: any) => {
		let opts: any = {}
		if (Dap.common.isObject(options)) {
			opts.type = options.type
			opts.message = options.message
			opts.timeout = options.timeout
			opts.background = options.background
			opts.color = options.color
			opts.zIndex = options.zIndex
			opts.icon = options.icon
		} else {
			opts.message = options
		}
		return opts
	},

	//显示弹窗
	showNotify: (options: any) => {
		return new Promise<void>(resolve => {
			//如果已经存在弹窗，则关闭后再进行
			if (Notify.$el && Notify.$instance) {
				Notify.$instance.unmount()
				Notify.$el.remove()
			}
			let opts = Notify.initParams(options)
			let mountNode = Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(NotifyComponent, {
				...opts,
				__init: (vm: ComponentInternalInstance) => {
					//获取组件实例进行保存
					Notify.$vm = vm
				},
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			instance.mount(mountNode)
			//保存应用实例和应用所挂载的元素
			Notify.$el = mountNode
			Notify.$instance = instance
		})
	},

	//关闭弹窗
	hideNotify: () => {
		if (Notify.$vm) {
			Notify.$vm.exposed!.show = false
		}
	},

	//注册函数
	install: (app: App) => {
		app.config.globalProperties.$showNotify = Notify.showNotify
		app.provide('$showNotify', Notify.showNotify)

		app.config.globalProperties.$hideNotify = Notify.hideNotify
		app.provide('$hideNotify', Notify.hideNotify)
	}
}

export { Notify, Notify as default }
