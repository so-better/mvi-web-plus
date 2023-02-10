<template>
    <div class="mvi-p-10">
        <div style="width:2rem;height:2rem;border: 1px solid #ccc;" v-ripple>
        </div>
        <m-button @click="show=!show" v-ripple>按钮</m-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true
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
