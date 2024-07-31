import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Spy from './spy'
export type * from './spy'

const vSpy = withInstallDirective('spy', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const spy = new Spy(el, options)
		//初始化
		spy.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:spy', spy)
	},
	beforeUnmount(el) {
		//获取对象
		const spy: Spy = Dap.data.get(el, 'directive:spy')
		if (spy) {
			//移除容器队列监听的滚动事件
			spy.destroy()
		}
	}
})

export { Spy, vSpy, vSpy as default }
