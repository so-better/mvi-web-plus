<template>
	<div class="mvi-p-2">
		<div style="height: 5rem; overflow: auto" id="scroll">
			<m-list scroll-el="#scroll" :finished="finished" v-model:loading="loading" loading-icon="load-e" v-model:error="error" @load="loadMore" immediate-load>
				<m-cell border v-for="(_item, index) in list" :title="'单元格' + index"></m-cell>
			</m-list>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const error = ref(false)
const loading = ref(false)
const list = ref<any[]>([])
const finished = ref(false)
const loadMore = () => {
	setTimeout(() => {
		loading.value = false
		error.value = false
		list.value = [...list.value, ...new Array(30)]
		if (list.value.length > 100) {
			finished.value = true
		}
	}, 1000)
}
</script>
<style lang="less"></style>
