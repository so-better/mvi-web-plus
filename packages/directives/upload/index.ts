import Dap from 'dap-util'
import { App, FunctionPlugin } from 'vue'
import Upload from './upload'

const install: FunctionPlugin = (app: App) => {
	//文件上传
	app.directive('upload', {
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
}

export { Upload, install as default }
