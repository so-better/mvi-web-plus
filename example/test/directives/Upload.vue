<template>
	<div class="mvi-p-2">
		<m-button v-upload="uploadOpt" block type="success">选择文件</m-button>
		<div class="mvi-py-2">
			<m-cell border v-for="item in selectFiles" :title="item.name"></m-cell>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectFiles = ref([])
const uploadOpt = ref({
	accept: 'image/png',
	capture: false,
	allowedFileType: ['jpg', 'png', 'jpeg'],
	multiple: true,
	minSize: -1,
	maxSize: -1,
	minLength: -1,
	maxLength: -1,
	append: false,
	disabled: false,
	extra: {},
	error: (errorType, file) => {
		console.log(errorType, file)
	},
	select: (files, extra) => {
		console.log('选择的文件数组', files)
		console.log('额外的数据', extra)
		selectFiles.value = files
	},
	ready: instance => {
		console.log('初始化完成', instance)
	}
})
</script>
<style lang="less" scoped></style>
