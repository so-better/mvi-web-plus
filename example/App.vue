<template>
    <div class="mvi-p-2">
        <m-field size="large" prepend="search" placeholder="搜索..."></m-field>
        <m-field size="medium" placeholder="搜索..."></m-field>
        <m-field size="small" placeholder="搜索..."></m-field>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            value: ''
        }
    },
    mounted() {},
    methods: {}
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
