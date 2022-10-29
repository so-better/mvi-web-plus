import Prop from './prop'
import { Dap } from '../dap'

Prop.install = app => {
    //高度比例系数指令
    app.directive('prop', {
        mounted(el, binding) {
            let prop = new Prop(el, binding.value)
            prop.init()
            //将对象记录在元素里
            Dap.data.set(el, 'directive:prop', prop)
        },
        beforeUnmount(el, binding) {
            //获取对象
            let prop = Dap.data.get(el, 'directive:prop')
            if (prop) {
                //移除绑定在window上的事件
                prop._setOff()
            }
        }
    })
}

export { Prop, Prop as default }
