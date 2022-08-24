import $dap from 'dap-util'
import Anchor from './anchor'

Anchor.install = app => {
    //锚点定位指令
    app.directive('anchor', {
        mounted(el, binding) {
            let options = {}
            if ($dap.common.isObject(binding.value)) {
                Object.assign(options, binding.value)
            }
            let anchor = new Anchor(el, options)
            anchor.init()
        }
    })
}

export default Anchor
