import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Upload from './upload'
export type * from './upload'

const vUpload = withInstallDirective('upload', {
	mounted(el, binding) {
		const options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		if (Dap.common.isObject(binding.modifiers)) {
			Object.assign(options, binding.modifiers)
		}
		const upload = new Upload(el, options)
		upload.init()
	}
})

export { Upload, vUpload, vUpload as default }
