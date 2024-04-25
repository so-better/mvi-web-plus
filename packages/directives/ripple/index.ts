import Dap from 'dap-util'
import { App, FunctionPlugin } from 'vue'
import Ripple from './ripple'

const install: FunctionPlugin = (app: App) => {
	//锚点定位指令
	app.directive('ripple', {
		mounted(el, binding) {
			let options = {}
			if (Dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			let ripple = new Ripple(el, options)
			ripple.init()
			//将对象记录在元素里
			Dap.data.set(el, 'directive:ripple', ripple)
		},
		beforeUnmount(el) {
			//获取对象
			let ripple = Dap.data.get(el, 'directive:ripple')
			if (ripple) {
				//移除绑定在documentElement上的事件
				ripple.destroy()
			}
		}
	})
}
export { Ripple, install as default }
