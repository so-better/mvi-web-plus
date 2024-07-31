import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Ripple from './ripple'
export type * from './ripple'

const vRipple = withInstallDirective('ripple', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const ripple = new Ripple(el, options)
		//初始化
		ripple.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:ripple', ripple)
	},
	beforeUnmount(el) {
		//获取对象
		const ripple: Ripple = Dap.data.get(el, 'directive:ripple')
		if (ripple) {
			//移除绑定在documentElement上的事件
			ripple.destroy()
		}
	}
})
export { Ripple, vRipple, vRipple as default }
