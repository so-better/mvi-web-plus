import { createApp } from 'vue'
import $dap from 'dap-util'
import msgBoxComponent from './msgbox.vue'

const MsgBox = {
    //初始化参数
    initParams: options => {
        let opts = {}
        if ($dap.common.isObject(options)) {
            opts.message = options.message
            opts.timeout = options.timeout
            opts.animation = options.animation
            opts.zIndex = options.zIndex
            opts.color = options.color
            opts.background = options.background
        } else {
            opts.message = options
        }
        return opts
    },

    //弹窗调用
    msgbox: options => {
        return new Promise((resolve, reject) => {
            let opts = MsgBox.initParams(options)
            let mountNode = $dap.element.string2dom('<div></div>')
            document.body.appendChild(mountNode)
            const instance = createApp(msgBoxComponent, {
                ...opts,
                remove: () => {
                    instance.unmount()
                    mountNode.remove()
                    resolve()
                }
            })
            instance.mount(mountNode)
        })
    },

    //注册函数
    install: app => {
        app.config.globalProperties.$msgbox = MsgBox.msgbox
        app.provide('$msgbox', MsgBox.msgbox)
    }
}

export default MsgBox
