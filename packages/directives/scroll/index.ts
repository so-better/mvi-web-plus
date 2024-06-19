import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Scroll from './scroll'

const ScrollDirective = withInstallDirective('scroll', {
	mounted(el, binding) {
		let options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		let scroll = new Scroll(el, options)
		scroll.init()
	}
})

export type * from '@/directives/scroll/scroll'
export { Scroll, ScrollDirective, ScrollDirective as default }
