<template>
    <m-list v-model:loading="loading" loading-icon="load-e" v-model:error="error">
        <m-cell-group>
            <m-cell v-for="(item,index) in new Array(20)" :title="'单元格'+index"></m-cell>
        </m-cell-group>
    </m-list>
</template>
<script>
import Px from '../packages/components/px/px'
export default {
    data() {
        return {
            error: false,
            loading: true
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false
            this.error = true
        }, 1000)
    },
    methods: {
        change(res) {}
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
