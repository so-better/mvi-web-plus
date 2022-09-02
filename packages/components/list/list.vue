<template>
    <div class="mvi-list">
        <slot></slot>
        <div v-if="loading" class="mvi-list-loading">
            <m-icon class="mvi-list-loading-icon" v-if="loadingIcon" :color="loadingColor" :type="loadingIcon" spin />
            <span :style="loadingStyle">{{loadingText}}</span>
        </div>
        <div v-else-if="error" @click="doLoad" class="mvi-list-error">
            <m-icon class="mvi-list-error-icon" v-if="errorIcon" :color="errorColor" :type="errorIcon" />
            <span :style="errorStyle">{{errorText}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'm-list',
    emits: ['load', 'update:loading', 'update:error', 'update:finished'],
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        //加载文案
        loadingText: {
            type: String,
            default: '正在加载'
        },
        //加载图标
        loadingIcon: {
            type: String,
            default: null
        },
        //加载字体颜色
        loadingColor: {
            type: String,
            default: null
        },
        //错误文案
        errorText: {
            type: String,
            default: '数据加载失败'
        },
        //错误图标
        errorIcon: {
            type: String,
            default: null
        },
        //错误字体颜色
        errorColor: {
            type: String,
            default: null
        },
        //是否已经完成
        finished: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        errorStyle() {
            let style = {}
            if (this.errorColor) {
                style.color = this.errorColor
            }
            return style
        },
        loadingStyle() {
            let style = {}
            if (this.loadingColor) {
                style.color = this.loadingColor
            }
            return style
        }
    },
    methods: {
        //执行加载函数
        doLoad() {
            this.$emit('update:loading', true)
            this.$emit('update:error', false)
            this.$emit('update:finished', false)
            this.$emit('load')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-list {
    display: block;
    width: 100%;

    .mvi-list-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: @mp-lg;
        font-size: @font-size-default;
        color: @font-color-mute;

        .mvi-list-loading-icon {
            margin-right: @mp-xs;
        }
    }

    .mvi-list-error {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: @mp-lg;
        font-size: @font-size-default;
        color: @font-color-mute;

        .mvi-list-error-icon {
            margin-right: @mp-xs;
        }
    }
}
</style>