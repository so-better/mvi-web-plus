import { ComponentInternalInstance, Ref } from 'vue'
import Dap from 'dap-util'

//判断组件默认插槽的内容是否都是指定的组件
export const componentIsMatch = (instance: ComponentInternalInstance, childName: string, names: string[]) => {
	//获取默认插槽的内容
	const vnodes = instance.slots.default ? instance.slots.default() : []
	//插槽内容是否都是规定的组件
	const isMatch = vnodes.every(vnode => {
		//注释节点不包含在内
		if (vnode.type == Symbol.for('v-cmt')) {
			return true
		}
		return Dap.common.isObject(vnode.type) && (<any>vnode.type).name == childName
	})
	//如果不全是规定的组件，进行报错
	if (!isMatch) {
		throw new Error(`The default slot for component "${names[0]}" can only accommodate component "${names[1]}"`)
	}
}

//判断组件的父组件是不是指定的组件
export const parentIsMatch = (children: Ref<ComponentInternalInstance[]> | null, parentInstance: ComponentInternalInstance | null, parentName: string, names: string[]) => {
	if (!children || !parentInstance || parentInstance.type.name != parentName) {
		throw new Error(`Component "${names[1]}" cannot be used alone and must be placed in the default slot of component "${names[0]}"`)
	}
}
