import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Observe from './observe'

const vObserve = withInstallDirective('observe', {
	mounted(el, binding) {
		let options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		let observe = new Observe(el, options)
		observe.init()
	}
})

export type * from '@/directives/observe/observe'
export { Observe, vObserve, vObserve as default }
