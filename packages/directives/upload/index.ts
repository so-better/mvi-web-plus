import Dap from 'dap-util'
import Upload from './upload'
import { App } from 'vue'

Upload.install = (app: App) => {
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

export { Upload, Upload as default }
