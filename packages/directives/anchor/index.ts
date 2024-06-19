import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Anchor from './anchor'

const AnchorDirective = withInstallDirective('anchor', {
	mounted(el, binding) {
		let options: any = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		let anchor = new Anchor(el, options)
		anchor.init()
	}
})

export type * from '@/directives/anchor/anchor'
export { Anchor, AnchorDirective, AnchorDirective as default }
