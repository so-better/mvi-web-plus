<template>
    <div class="mvi-p-10">

    </div>
</template>
<script>
import Px from '../packages/components/px/px'
export default {
    data() {
        return {
            value: '',
            index: 0,
            num: 10,
            show: true,
            date: new Date()
        }
    },
    methods: {
        change(res) {
            this.$prompt({
                title: '温馨提示',
                message: '你已经失去连接'
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
