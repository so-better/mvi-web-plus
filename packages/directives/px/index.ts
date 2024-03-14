import Dap from 'dap-util'
import { App } from 'vue'
import Px from './px'

Px.install = (app: App) => {
	//1px适配指令
	app.directive('px', {
		mounted(el, binding) {
			let options: any = {}
			if (Dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			if (Dap.common.isObject(binding.modifiers)) {
				Object.assign(options, binding.modifiers)
			}
			if (binding.arg) {
				options.attr = binding.arg
			}
			let px = new Px(el, options)
			px.init()
		}
	})
}

export { Px, Px as default }
