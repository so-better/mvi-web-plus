import { Dap } from '../dap'
import Drag from './drag'

Drag.install = app => {
	//拖拽
	app.directive('drag', {
		mounted(el, binding) {
			let options = {}
			if (Dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			let drag = new Drag(el, options)
			//初始化
			drag.init()
			//将对象记录在元素里
			Dap.data.set(el, 'directive:drag', drag)
		},
		beforeUnmount(el) {
			//获取对象
			let drag = Dap.data.get(el, 'directive:drag')
			if (drag) {
				//移除绑定在documentElement上的事件
				drag.destroy()
			}
		}
	})
}

export { Drag, Drag as default }
