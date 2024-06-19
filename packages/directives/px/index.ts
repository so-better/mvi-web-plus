import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Px from './px'

const PxDirective = withInstallDirective('px', {
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

export type * from '@/directives/px/px'
export { Px, PxDirective, PxDirective as default }
