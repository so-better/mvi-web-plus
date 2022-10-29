import { Dap } from '../dap'
import Anchor from './anchor'

Anchor.install = app => {
    //锚点定位指令
    app.directive('anchor', {
        mounted(el, binding) {
            let options = {}
            if (Dap.common.isObject(binding.value)) {
                Object.assign(options, binding.value)
            }
            let anchor = new Anchor(el, options)
            anchor.init()
        }
    })
}
export { Anchor, Anchor as default }
