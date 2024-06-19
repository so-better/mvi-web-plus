import { App, ComponentInternalInstance, createApp, Directive, Ref, defineComponent, Component } from 'vue'
import Dap from 'dap-util'

export type SFCWithInstall<T> = T & { install(app: App): void }

/**
 * 判断组件默认插槽的内容是否都是指定的组件
 * @param instance
 * @param childName
 * @param names
 */
export const componentIsMatch = (instance: ComponentInternalInstance, childName: string, names: string[]) => {
	const component = defineComponent(() => {
		//获取默认插槽的内容
		const vnodes = instance.slots.default ? instance.slots.default() : []
		//插槽内容是否都是规定的组件
		const isMatch = vnodes.every(vnode => {
			//注释等一些特殊节点不在范围内
			if (typeof vnode.type == 'symbol') {
				return true
			}
			return Dap.common.isObject(vnode.type) && (<any>vnode.type).name == childName
		})
		if (!isMatch) {
			throw new Error(`The default slot for component "${names[0]}" can only accommodate component "${names[1]}"`)
		}
		return () => {
			return null
		}
	})
	createApp(component).mount(document.createElement('div'))
}

/**
 * 判断组件的父组件是不是指定的组件
 * @param children
 * @param parentInstance
 * @param parentName
 * @param names
 */
export const parentIsMatch = (children: Ref<ComponentInternalInstance[]> | null, parentInstance: ComponentInternalInstance | null, parentName: string, names: string[]) => {
	if (!children || !parentInstance || parentInstance.type.name != parentName) {
		throw new Error(`Component "${names[1]}" cannot be used alone and must be placed in the default slot of component "${names[0]}"`)
	}
}

/**
 * 给组件增加install属性
 * @param component
 * @returns
 */
export const withInstall = <T extends Component>(component: T) => {
	;(component as SFCWithInstall<T>).install = (app: App) => {
		app.component(component.name!, component)
	}
	return component as SFCWithInstall<typeof component>
}

/**
 * 给指令增加install属性
 * @param directive
 * @param name
 */
export const withInstallDirective = <T extends Directive>(name: string, directive: T) => {
	;(directive as SFCWithInstall<T>).install = (app: App) => {
		app.directive(name, directive)
	}
	return directive as SFCWithInstall<typeof directive>
}
