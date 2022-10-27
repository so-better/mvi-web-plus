<template>
    <div class="mvi-mb-4">
        <m-button @click="clear">清除画布</m-button>
    </div>
    <div style="width:6rem;height:6rem;margin-left: 1rem;">
        <m-sign color="#f30" ref="sign" :background="background"></m-sign>
    </div>
</template>
<script>
export default {
    data() {
        return {
            background: '#fff'
        }
    },
    methods: {
        clear() {
            //console.log(this.$refs.sign.getImage())
            this.$refs.sign.clear()
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
