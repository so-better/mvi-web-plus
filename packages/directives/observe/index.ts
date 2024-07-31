import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Observe from './observe'
export type * from './observe'

const vObserve = withInstallDirective('observe', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const observe = new Observe(el, options)
		//初始化
		observe.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:observe', observe)
	},
	beforeUnmount(el) {
		//获取对象
		const observe: Observe = Dap.data.get(el, 'directive:observe')
		if (observe) {
			//取消监听
			observe.destroy()
		}
	}
})

export { Observe, vObserve, vObserve as default }
