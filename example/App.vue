<template>
    <div class="mvi-mb-4">
        <m-button @click="clear">清除画布</m-button>
    </div>
    <div style="width:100%;height:6rem;">
        <m-sign :width="2" color="#f30" ref="sign" :background="background"></m-sign>
    </div>
</template>
<script>
import { Dialog } from '../packages'
export default {
    data() {
        return {
            background: '#fff'
        }
    },
    methods: {
        clear() {
            //console.log(this.$refs.sign.getImage())
            Dialog.alert('hello')
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
