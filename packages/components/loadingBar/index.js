import { createApp } from 'vue'
import $dap from 'dap-util'
import LoadingBarComponent from './loadingBar'

const LoadingBar = {
    //初始化参数
    initParams: options => {
        let opts = {}
        if ($dap.common.isObject(options)) {
            opts.color = options.color
            opts.zIndex = options.zIndex
        } else if (typeof options == 'string') {
            opts.color = options
        }
        return opts
    },

    //显示加载进度条
    showLoadingBar: options => {
        return new Promise((resolve, reject) => {
            //如果已经存在进度条，则关闭后再进行
            if (LoadingBar.$el && LoadingBar.$instance) {
                LoadingBar.$instance.unmount()
                LoadingBar.$el.remove()
            }
            let opts = LoadingBar.initParams(options)
            let mountNode = $dap.element.string2dom('<div></div>')
            document.body.appendChild(mountNode)
            const instance = createApp(LoadingBarComponent, {
                ...opts,
                init: vm => {
                    //获取组件实例进行保存
                    LoadingBar.$vm = vm
                },
                remove: () => {
                    instance.unmount()
                    mountNode.remove()
                    resolve()
                }
            })
            instance.mount(mountNode)
            //保存应用实例和应用所挂载的元素
            LoadingBar.$el = mountNode
            LoadingBar.$instance = instance
        })
    },

    //关闭加载进度条
    hideLoadingBar: () => {
        if (LoadingBar.$vm) {
            LoadingBar.$vm.leave()
        }
    },

    //注册函数
    install: app => {
        //挂载
        app.config.globalProperties.$showLoadingBar = LoadingBar.showLoadingBar
        app.provide('$showLoadingBar', LoadingBar.showLoadingBar)

        app.config.globalProperties.$hideLoadingBar = LoadingBar.hideLoadingBar
        app.provide('$hideLoadingBar', LoadingBar.hideLoadingBar)
    }
}

export default LoadingBar
