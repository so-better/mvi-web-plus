import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Scroll from './scroll'
export type * from './scroll'

const vScroll = withInstallDirective('scroll', {
	mounted(el, binding) {
		let options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		let scroll = new Scroll(el, options)
		scroll.init()
	}
})

export { Scroll, vScroll, vScroll as default }
