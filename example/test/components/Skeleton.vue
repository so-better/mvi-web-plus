<template>
	<div class="mvi-p-2">
		<m-skeleton class="mvi-mb-4" :rows="2" loading> </m-skeleton>
		<m-skeleton class="mvi-mb-4" :rows="4" loading :rowWidth="['3rem', '4rem', '1rem', '1rem']"> </m-skeleton>
		<m-skeleton class="mvi-mb-4" avatar round avatarRound :rows="2" loading> </m-skeleton>
		<m-skeleton class="mvi-mb-4" animation title avatar :rows="2" loading> </m-skeleton>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less"></style>
