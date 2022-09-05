<template>
    <m-pull-refresh v-model="refresh" @refresh="change">
        <m-list ref="list" :finished="finished" v-model:loading="loading" loading-icon="load-e" v-model:error="error" @load="loadMore" immediate-load>
            <m-cell border v-for="(item,index) in list" :title="'单元格'+index"></m-cell>
            <template #loading>
                <m-icon type="load-c" spin size=".4rem"></m-icon>
            </template>
        </m-list>
    </m-pull-refresh>

</template>
<script>
export default {
    data() {
        return {
            error: false,
            loading: false,
            refresh: false,
            list: [],
            finished: false
        }
    },
    methods: {
        change(res) {
            setTimeout(() => {
                this.list = []
                this.list = new Array(30)
                this.refresh = false
                this.loading = false
                this.error = false
                this.finished = false
                this.$msgbox('刷新成功')
            }, 1000)
        },
        loadMore() {
            setTimeout(() => {
                this.loading = false
                this.error = false
                this.list = [...this.list, ...new Array(30)]
                if (this.list.length > 100) {
                    this.finished = true
                }
                this.$nextTick(() => {
                    this.$refs.list.initScrollBottom()
                })
            }, 2000)
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
