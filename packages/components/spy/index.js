import { Dap } from '../dap'
import Spy from './spy'

Spy.install = app => {
	//滚动侦听
	app.directive('spy', {
		mounted(el, binding) {
			let options = {}
			if (Dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			let spy = new Spy(el, options)
			spy.init()
			//将对象记录在元素里
			Dap.data.set(el, 'directive:spy', spy)
		},
		beforeUnmount(el) {
			//获取对象
			let spy = Dap.data.get(el, 'directive:spy')
			if (spy) {
				//移除容器队列监听的滚动事件
				spy.destroy()
			}
		}
	})
}

export { Spy, Spy as default }
