<template>
    <div class="mvi-panel">
        <div :class="titleCls" v-if="$slots.title || title">
            <slot name="title" v-if="$slots.title"></slot>
            <span v-else v-text="title"></span>
        </div>
        <div :class="contentCls" v-if="$slots.default || content">
            <slot v-if="$slots.default"></slot>
            <span v-else v-text="content"></span>
        </div>
        <div :class="footerCls" v-if="$slots.footer || footer">
            <slot name="footer" v-if="$slots.footer"></slot>
            <span v-else v-text="footer"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'm-panel',
    props: {
        //标题
        title: {
            type: String,
            default: null
        },
        //内容
        content: {
            type: String,
            default: null
        },
        //尾注
        footer: {
            type: String,
            default: null
        },
        //标题class
        titleClass: {
            type: String,
            default: null
        },
        //内容class
        contentClass: {
            type: String,
            default: null
        },
        //尾注class
        footerClass: {
            type: String,
            default: null
        }
    },
    computed: {
        titleCls() {
            let cls = ['mvi-panel-header']
            if (this.$slots.default || this.content) {
                cls.push('mvi-panel-header-border')
            }
            if (this.titleClass) {
                cls.push(this.titleClass)
            }
            return cls
        },
        contentCls() {
            let cls = ['mvi-panel-content']
            if (this.contentClass) {
                cls.push(this.contentClass)
            }
            return cls
        },
        footerCls() {
            let cls = ['mvi-panel-footer']
            if (
                this.$slots.default ||
                this.content ||
                this.$slots.title ||
                this.title
            ) {
                cls.push('mvi-panel-footer-border')
            }
            if (this.footerClass) {
                cls.push(this.footerClass)
            }
            return cls
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-panel {
    display: block;
    position: relative;
    width: 100%;
    border: 1px solid @border-color;
    background-color: #fff;
}

.mvi-panel-header,
.mvi-panel-content,
.mvi-panel-footer {
    position: relative;
    display: block;
    width: 100%;
    line-height: 1.5;
    padding: @mp-sm;
}

.mvi-panel-header {
    font-size: @font-size-default;
    color: @font-color-default;
}

.mvi-panel-header.mvi-panel-header-border {
    border-bottom: 1px solid @border-color;
}

.mvi-panel-content {
    font-size: @font-size-default;
    color: @font-color-sub;
}

.mvi-panel-footer {
    font-size: @font-size-small;
    color: @font-color-mute;
    text-align: right;
}

.mvi-panel-footer.mvi-panel-footer-border {
    border-top: 1px solid @border-color;
}
</style>
