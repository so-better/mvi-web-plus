import Dap from 'dap-util'
import { App, FunctionPlugin } from 'vue'
import Observe from './observe'

const install: FunctionPlugin = (app: App) => {
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

export { Observe, install as default }
