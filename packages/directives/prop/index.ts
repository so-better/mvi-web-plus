import { withInstallDirective } from '@/utils'
import Dap from 'dap-util'
import Prop from './prop'

const vProp = withInstallDirective('prop', {
	mounted(el, binding) {
		let prop = new Prop(el, binding.value)
		prop.init()
		//将对象记录在元素里
		Dap.data.set(el, 'directive:prop', prop)
	},
	updated(el, binding) {
		let prop = Dap.data.get(el, 'directive:prop')
		if (prop) {
			prop.set(binding.value)
		}
	},
	beforeUnmount(el) {
		//获取对象
		let prop = Dap.data.get(el, 'directive:prop')
		if (prop) {
			//移除绑定在window上的事件
			prop.destroy()
		}
	}
})

export type * from '@/directives/prop/prop'
export { Prop, vProp, vProp as default }
