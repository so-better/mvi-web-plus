import Dap from 'dap-util'
import { withInstallDirective } from '@/utils'
import Upload from './upload'

const UploadDirective = withInstallDirective('upload', {
	mounted(el, binding) {
		let options = {}
		if (Dap.common.isObject(binding.value)) {
			Object.assign(options, binding.value)
		}
		if (Dap.common.isObject(binding.modifiers)) {
			Object.assign(options, binding.modifiers)
		}
		let upload = new Upload(el, options)
		upload.init()
	}
})

export type * from '@/directives/upload/upload'
export { Upload, UploadDirective, UploadDirective as default }
