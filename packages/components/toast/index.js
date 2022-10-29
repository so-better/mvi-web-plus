import { createApp } from 'vue'
import { Dap } from '../dap'
import ToastComponent from './toast.vue'

const Toast = {
    //初始化参数
    initParams: options => {
        let opts = {}
        if (Dap.common.isObject(options)) {
            opts.type = options.type
            opts.message = options.message
            opts.timeout = options.timeout
            opts.overlayColor = options.overlayColor
            opts.background = options.background
            opts.color = options.color
            opts.zIndex = options.zIndex
            opts.usePadding = options.usePadding
            opts.icon = options.icon
            opts.mountEl = options.mountEl
        } else {
            opts.message = options
            opts.timeout = 1500
        }
        return opts
    },

    //显示toast
    showToast: options => {
        return new Promise((resolve, reject) => {
            //如果已经存在弹窗，则关闭后再进行
            if (Toast.$el && Toast.$instance) {
                Toast.$instance.unmount()
                Toast.$el.remove()
            }
            let opts = Toast.initParams(options)
            let mountNode = Dap.element.string2dom('<div></div>')
            document.body.appendChild(mountNode)
            const instance = createApp(ToastComponent, {
                ...opts,
                init: vm => {
                    //获取组件实例进行保存
                    Toast.$vm = vm
                },
                remove: () => {
                    instance.unmount()
                    mountNode.remove()
                    resolve()
                }
            })
            instance.mount(mountNode)
            //保存应用实例和应用所挂载的元素
            Toast.$el = mountNode
            Toast.$instance = instance
        })
    },

    //关闭Toast
    hideToast: () => {
        if (Toast.$vm) {
            Toast.$vm.show = false
        }
    },

    //注册函数
    install: app => {
        app.config.globalProperties.$showToast = Toast.showToast
        app.provide('$showToast', Toast.showToast)

        app.config.globalProperties.$hideToast = Toast.hideToast
        app.provide('$hideToast', Toast.hideToast)
    }
}

export { Toast, Toast as default }
