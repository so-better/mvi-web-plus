//全局默认样式
import './css/mvi-default.less'
//辅助样式
import './css/mvi-support.less'
//引入dap工具类
import dap from 'dap-util'
//解决ios系统下css伪类无效的问题
dap.event.on(window, 'touchstart.ios', e => {})
//组件
import components from './components'

//注册组件和工具类
const install = app => {
    if (install.installed) return
    install.installed = true
    app.config.globalProperties.$dap = dap
    app.provide('$dap', dap)
    Object.values(components).map(component => {
        component.install(app)
    })
}

import packages from '../package.json'

console.log(
    '%c感谢使用' +
        packages.name +
        '，当前版本：%c v' +
        packages.version +
        '\n%c如果你觉得' +
        packages.name +
        '还不错，不妨去github点个star\ngithub地址：%c' +
        packages.repository.url,
    'color:#808080;',
    'color:#008a00',
    'color:#808080;',
    'color:#008a00'
)

//import时导出install
export default install
