<template>
	<div class="mvi-p-2">
		<div class="mvi-mb-2">
			<m-button @click="show = !show" type="info" id="btn">浮层的关联元素</m-button>
			<m-layer v-model="show" relate="#btn" closable border showTriangle shadow>
				<div class="layer"></div>
			</m-layer>
		</div>
		<div>
			<m-button @click="show2 = !show2" type="info" id="btn2">浮层的关联元素</m-button>
			<m-layer v-model="show2" relate="#btn2" closable showTriangle background="#000" border border-color="#000">
				<div class="layer"></div>
			</m-layer>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const show2 = ref(false)
</script>
<style lang="less">
.layer {
	width: 4rem;
	height: 2rem;
}
</style>
