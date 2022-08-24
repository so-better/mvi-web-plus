import $dap from 'dap-util'
import Upload from './upload'

Upload.install = app => {
    //文件上传
    app.directive('upload', {
        mounted(el, binding) {
            let options = {}
            if ($dap.common.isObject(binding.value)) {
                Object.assign(options, binding.value)
            }
            if ($dap.common.isObject(binding.modifiers)) {
                Object.assign(options, binding.modifiers)
            }
            let upload = new Upload(el, options)
            upload.init()
        }
    })
}

export default Upload
