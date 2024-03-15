<template>
	<div class="mvi-p-2">
		<m-collapse v-model="value" accordion>
			<m-collapse-item title="标题1" disabled label="这是一个简单的标题" icon="user"> 风萧萧兮易水寒 </m-collapse-item>
			<m-collapse-item title="标题2" label="这是一个简单的标题" content="风萧萧兮易水寒,壮士一去兮不复还"></m-collapse-item>
			<m-collapse-item title="标题3" label="这是一个简单的标题">
				<div class="mvi-bg-error" v-prop="0.5"></div>
			</m-collapse-item>
		</m-collapse>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
<style lang="less"></style>
