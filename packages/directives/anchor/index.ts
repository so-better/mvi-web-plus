import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Anchor from './anchor'
export type * from './anchor'

const vAnchor = withInstallDirective('anchor', {
	mounted(el, binding) {
		const options: any = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		const anchor = new Anchor(el, options)
		anchor.init()
	}
})

export { Anchor, vAnchor, vAnchor as default }
