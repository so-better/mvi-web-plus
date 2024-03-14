<template>
	<div>
		<div class="mvi-mb-4">
			<m-button class="mvi-m-1" type="info" @click="height += 0.2">点击修改元素高度</m-button>
			<m-button class="mvi-m-1" type="warn" @click="addNode">点击加入子元素</m-button>
			<m-button class="mvi-m-1" type="warn" @click="removeNode">点击移除子元素</m-button>
		</div>
		<div class="example mvi-mb-2" v-observe="observeOpt" :style="{ height: height + 'rem' }"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const height = ref(1)
const inputValue = ref('这是input的默认值')
const observeOpt = ref({
	attributes: true,
	childList: true,
	subtree: true,
	attributesChange: (attrName: string, newVal: string, oldVal: string) => {
		console.log(`属性 ${attrName} 发生变更，新值为 ${newVal}，旧值为 ${oldVal}`)
	},
	childNodesChange: (addNode: Node, removeNode: Node) => {
		if (addNode) {
			console.log(`新增子节点，新增的节点为：`, addNode)
		} else {
			console.log(`移除子节点，移除的节点为：`, removeNode)
		}
	}
})
let index = 1
const addNode = () => {
	const node = document.createElement('button')
	node.innerText = '新加入的按钮' + index
	document.body.querySelector('.example')!.appendChild(node)
	index++
}
const removeNode = () => {
	const parent = document.body.querySelector('.example')!
	if (parent.childNodes.length) {
		const lastNode = parent.childNodes[parent.childNodes.length - 1]
		lastNode.remove()
		index--
	}
}
</script>
<style lang="less" scoped>
.example {
	width: 100%;
	background-color: #f30;
	overflow: auto;
}
</style>
