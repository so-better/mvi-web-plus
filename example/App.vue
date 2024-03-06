<template>
    <div class="mvi-p-10">
        <m-button @click="onClick">Button</m-button>
        <m-date-chooser :headerFormatter="headerFormatter" v-model="date" :layerProps="{ width: '8rem' }">
            <m-button>按钮</m-button>
        </m-date-chooser>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            value: 0,
            date: new Date(),
            options: [
                {
                    label: '选项A',
                    value: 0
                },
                {
                    label: '选项B',
                    value: 1
                },
                {
                    label: '选项C',
                    value: 2
                },
                {
                    label: '选项D',
                    value: 3
                }
            ]
        }
    },
    mounted() { },
    methods: {
        onClick() {
            // this.show = !this.show
            this.$showNotify({
                timeout: 3000,
                message: 'wocao'
            })
            setTimeout(() => {
                this.$hideNotify()
            }, 500);
        },
        headerFormatter(type, num) {
            if (type == 'year') {
                return num
            }
            return num + '号'
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
