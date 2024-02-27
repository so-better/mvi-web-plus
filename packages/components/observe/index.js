import Dap from 'dap-util'
import Observe from './observe'

Observe.install = app => {
	//监听元素属性变化
	app.directive('observe', {
		mounted(el, binding) {
			let options = {}
			if (Dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			let observe = new Observe(el, options)
			observe.init()
		}
	})
}

export { Observe, Observe as default }
