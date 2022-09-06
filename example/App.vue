<template>
    <m-button @click="change">Button</m-button>
</template>
<script>
export default {
    data() {
        return {
            error: false,
            loading: false,
            refresh: false,
            list: [],
            active: 1,
            finished: false
        }
    },
    methods: {
        change() {
            this.$confirm({
                message: '信息已经更新',
                closable: false
            }).then(res => {
                console.log(res)
            })
        }
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
