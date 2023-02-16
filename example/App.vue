<template>
    <div class="mvi-p-2">
        <div style="position: absolute;width:3rem;height:3rem;border: 1px solid #ddd;" v-ripple></div>
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
