<template>
    <div class="mvi-p-10">
        <m-button @click="onClick">Button</m-button>
        <m-switch v-model="show">

        </m-switch>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            value: '',
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
