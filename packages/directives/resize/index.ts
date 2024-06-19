import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Resize from './resize'

const ResizeDirective = withInstallDirective('resize', {
	mounted(el, binding) {
		let options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		let resize = new Resize(el, options)
		resize.init()

		//将对象记录在元素里
		Dap.data.set(el, 'directive:resize', resize)
	},
	beforeUnmount(el) {
		//获取对象
		let resize = Dap.data.get(el, 'directive:resize')
		if (resize) {
			//移除绑定在documentElement上的事件
			resize.destroy()
		}
	}
})

export type * from '@/directives/resize/resize'
export { Resize, ResizeDirective, ResizeDirective as default }
