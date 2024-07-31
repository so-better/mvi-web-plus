import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Resize from './resize'
export type * from './resize'

const vResize = withInstallDirective('resize', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const resize = new Resize(el, options)
		//初始化
		resize.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:resize', resize)
	},
	beforeUnmount(el) {
		//获取对象
		const resize: Resize = Dap.data.get(el, 'directive:resize')
		if (resize) {
			//移除绑定在documentElement上的事件
			resize.destroy()
		}
	}
})

export { Resize, vResize, vResize as default }
