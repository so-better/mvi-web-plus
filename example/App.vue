<script>
export default {
    data() {
        return {
            show: true,
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
            this.show = !this.show
        }
    }
}
</script>

<template>
    <div class="mvi-p-10">
        <m-button @click="onClick">Button</m-button>
        <m-navbar border left-icon="angle-left" title="MVI移动端组件库">
            <template #right>333</template>
        </m-navbar>
    </div>
</template>

<style lang="less">
html {
    font-size: 50px;
}

#app {
    height: 100%;
    overflow: auto;
}
</style>
