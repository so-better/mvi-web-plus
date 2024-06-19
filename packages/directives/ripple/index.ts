import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Ripple from './ripple'

const vRipple = withInstallDirective('ripple', {
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

export type * from '@/directives/ripple/ripple'
export { Ripple, vRipple, vRipple as default }
