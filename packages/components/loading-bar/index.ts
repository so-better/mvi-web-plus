import { App, ComponentInternalInstance, createApp } from 'vue'
import Dap from 'dap-util'
import LoadingBarComponent from './loading-bar.vue'
import { LoadingBarPropsType } from './props'

type LoadingBarType = {
	//挂载的dom
	$el?: HTMLElement
	//创建的应用实例
	$instance?: App<Element>
	//组件实例
	$vm?: ComponentInternalInstance
	initParams: (options: string | LoadingBarPropsType) => LoadingBarPropsType
	showLoadingBar: (options: string | LoadingBarPropsType) => void
	hideLoadingBar: () => void
	install: (app: App) => void
}

const LoadingBar: LoadingBarType = {
	//初始化参数
	initParams: options => {
		let opts: LoadingBarPropsType = {}
		if (Dap.common.isObject(options)) {
			opts.color = (<LoadingBarPropsType>options).color
			opts.zIndex = (<LoadingBarPropsType>options).zIndex
		} else if (typeof options == 'string') {
			opts.color = options
		}
		return opts
	},

	//显示加载进度条
	showLoadingBar: options => {
		return new Promise<void>(resolve => {
			//如果已经存在进度条，则关闭后再进行
			if (LoadingBar.$el && LoadingBar.$instance) {
				LoadingBar.$instance.unmount()
				LoadingBar.$el.remove()
			}
			let opts = LoadingBar.initParams(options)
			let mountNode = <HTMLElement>Dap.element.string2dom('<div></div>')
			document.body.appendChild(mountNode)
			const instance = createApp(LoadingBarComponent, {
				...opts,
				__init: (vm: ComponentInternalInstance) => {
					//获取组件实例进行保存
					LoadingBar.$vm = vm
				},
				__remove: () => {
					instance.unmount()
					mountNode.remove()
					resolve()
				}
			})
			instance.mount(mountNode)
			//保存应用实例和应用所挂载的元素
			LoadingBar.$el = mountNode
			LoadingBar.$instance = instance
		})
	},

	//关闭加载进度条
	hideLoadingBar: () => {
		if (LoadingBar.$vm) {
			LoadingBar.$vm.exposed!.leave()
		}
	},

	//注册函数
	install: app => {
		//挂载
		app.config.globalProperties.$showLoadingBar = LoadingBar.showLoadingBar
		app.provide('$showLoadingBar', LoadingBar.showLoadingBar)

		app.config.globalProperties.$hideLoadingBar = LoadingBar.hideLoadingBar
		app.provide('$hideLoadingBar', LoadingBar.hideLoadingBar)
	}
}

export { LoadingBar, LoadingBar as default }
