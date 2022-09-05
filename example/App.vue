<template>
    <m-tooltip trigger="hover" placement="right-end" title="打开一个Modal">
        <m-button>Button</m-button>
    </m-tooltip>
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
