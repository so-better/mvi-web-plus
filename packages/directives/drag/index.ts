import { withInstallDirective } from '@/utils'
import Dap from 'dap-util'
import Drag from './drag'
export type * from './drag'

const vDrag = withInstallDirective('drag', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const drag = new Drag(el, options)
		//初始化
		drag.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:drag', drag)
	},
	beforeUnmount(el) {
		//获取对象
		const drag: Drag = Dap.data.get(el, 'directive:drag')
		if (drag) {
			//移除绑定在documentElement上的事件
			drag.destroy()
		}
	}
})

export { Drag, vDrag, vDrag as default }
