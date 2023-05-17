import Dap from 'dap-util'

Dap.install = app => {
	app.config.globalProperties.$dap = Dap
	app.provide('$dap', Dap)
}

//解决ios系统下css伪类无效的问题
Dap.event.on(window, 'touchstart.ios', e => {})

export { Dap, Dap as default }
