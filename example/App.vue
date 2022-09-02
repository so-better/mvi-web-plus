<template>
    <m-tabbar @change="change" fixed v-model="index" :tabs="tabs"></m-tabbar>
    <div class="mvi-p-10">

    </div>
</template>
<script>
import Px from '../packages/components/px/px'
export default {
    data() {
        return {
            index: 0,
            num: 10,
            show: true
        }
    },
    computed: {
        tabs() {
            return [
                {
                    value: 0,
                    name: '首页'
                },
                {
                    value: 1,
                    name: '附近',
                    badge: {
                        show: this.show,
                        content: this.num,
                        background: 'rgba(255,0,0,.72)',
                        dot: false
                    }
                },
                {
                    value: 2,
                    name: '关注'
                },
                {
                    value: 3,
                    name: '我的'
                }
            ]
        }
    },
    mounted() {},
    methods: {
        change(res) {
            if (res.value == 1) {
                this.num = 0
                this.show = false
            }
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
