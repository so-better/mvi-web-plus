import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Px from './px'
export type * from './px'

const vPx = withInstallDirective('px', {
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

export { Px, vPx, vPx as default }
