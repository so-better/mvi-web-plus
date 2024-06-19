import { App, ComponentInternalInstance, createApp } from 'vue'
import Dap from 'dap-util'
import NotifyComponent from './notify.vue'
import { NotifyPropsType } from './props'

type NotifyType = {
	//挂载的dom
	$el?: HTMLElement
	//创建的应用实例
	$instance?: App<Element>
	//组件实例
	$vm?: ComponentInternalInstance
	initParams: (options: string | NotifyPropsType) => NotifyPropsType
	install: (app: App) => void
	showNotify: (options: NotifyPropsType) => Promise<void>
	hideNotify: () => void
}

const Notify: NotifyType = {
	//初始化参数
	initParams: options => {
		let opts: NotifyPropsType = {}
		if (Dap.common.isObject(options)) {
			opts.type = (<NotifyPropsType>options).type
			opts.message = (<NotifyPropsType>options).message
			opts.timeout = (<NotifyPropsType>options).timeout
			opts.background = (<NotifyPropsType>options).background
			opts.color = (<NotifyPropsType>options).color
			opts.zIndex = (<NotifyPropsType>options).zIndex
			opts.icon = (<NotifyPropsType>options).icon
		} else {
			opts.message = <string>options
		}
		return opts
	},

	//安装函数
	install: app => {
		app.config.globalProperties.$showNotify = Notify.showNotify
		app.provide('$showNotify', Notify.showNotify)

		app.config.globalProperties.$hideNotify = Notify.hideNotify
		app.provide('$hideNotify', Notify.hideNotify)
	},

	//显示弹窗
	showNotify: options => {
		return new Promise<void>(resolve => {
			//如果已经存在弹窗，则关闭后再进行
			if (Notify.$el && Notify.$instance) {
				Notify.$instance.unmount()
				Notify.$el.remove()
			}
			let opts = Notify.initParams(options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
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
			Notify.$vm.exposed!.show.value = false
		}
	}
}

export type * from '@/components/notify/props'
export { Notify, Notify as default }
