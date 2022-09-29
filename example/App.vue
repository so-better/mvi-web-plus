<template>
    <!-- <m-button @click="loading=!loading">Button</m-button>
    <m-skeleton animation title title-width="60%" :rows="4" class="mvi-mt-10" :loading="loading">
        <h5>mvi-web-plus v1.5.4发布</h5>
        <p>近日mvi-web的作者凌凯宣布mvi-web框架正式停止更新，日后将专注于mvi-web-plus的开发和迭代。mvi-web-plus是基于Vue3开发的一款新的UI组件库，相比于mvi-web，提供了更多的更丰富的组件。</p>
    </m-skeleton> -->
    {{value}}
    <div class="mvi-p-4">
        <m-stepper v-model="value"></m-stepper>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            value: 40,
            show: false
        }
    },
    methods: {
        change() {}
    }
}
</script>
<style lang="less">
html {
    font-size: 50px;
}

#app {
    height: 100%;
    overflow: auto;
}
</style>
