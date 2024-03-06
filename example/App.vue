<template>
    <div class="mvi-p-10">
        <m-button @click="onClick">Button</m-button>
        <m-collapse v-model="value" accordion outBorder inBorder>
            <m-collapse-item title="标题1" label="这是一个简单的标题">
                风萧萧兮易水寒
            </m-collapse-item>
            <m-collapse-item title="标题2" label="这是一个简单的标题" content="风萧萧兮易水寒,壮士一去兮不复还"></m-collapse-item>
            <m-collapse-item title="标题3" label="这是一个简单的标题">
                <div class="mvi-bg-error" v-prop="0.5"></div>
            </m-collapse-item>
        </m-collapse>
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
