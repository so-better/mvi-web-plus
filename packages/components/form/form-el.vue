<template>
    <div :class="['mvi-form-el',form.block?'mvi-form-el-block':'']" :style="formElStyle">
        <div v-if="label" :class="labelCls" v-text="label" :style="labelStyle"></div>
        <div v-if="$slots.default" class="mvi-form-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'm-form-el',
    props: {
        //垂直对齐方式
        align: {
            type: String,
            default: null
        },
        //宽度
        width: {
            type: String,
            default: null
        },
        //标签内容
        label: {
            type: String,
            default: ''
        },
        //标签额外样式
        labelClass: {
            type: String,
            default: null
        },
        //标签宽度
        labelWidth: {
            type: String,
            default: null
        },
        //标签距离右侧距离
        labelOffset: {
            type: String,
            default: null
        }
    },
    inject: ['form'],
    computed: {
        labelCls() {
            let cls = ['mvi-form-label']
            if (this.form.labelClass) {
                cls.push(this.form.labelClass)
            }
            if (this.labelClass) {
                cls.push(this.labelClass)
            }
            if (this.form.labelBlock && this.form.block) {
                cls.push('mvi-form-label-block')
            }
            return cls
        },
        labelStyle() {
            let style = {}
            if (this.form.labelWidth && !this.form.labelBlock) {
                style.width = this.form.labelWidth
            }
            if (this.labelWidth && !this.form.labelBlock) {
                style.width = this.labelWidth
            }
            if (this.form.labelOffset) {
                if (this.form.labelBlock) {
                    style.marginBottom = this.form.labelOffset
                } else {
                    style.marginRight = this.form.labelOffset
                }
            }
            if (this.labelOffset) {
                if (this.form.labelBlock) {
                    style.marginBottom = this.labelOffset
                } else {
                    style.marginRight = this.labelOffset
                }
            }
            return style
        },
        formElStyle() {
            let style = {}
            if (this.width && !this.form.block) {
                style.width = this.width
            }
            if (this.form.align) {
                style.alignItems = this.form.align
            }
            if (this.align) {
                style.alignItems = this.align
            }
            return style
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-form-el {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    width: 6.4rem;
    padding: @mp-sm;

    &.mvi-form-el-block {
        width: 100%;
    }
}

.mvi-form-label {
    display: block;
    width: 1.2rem;
    text-align: right;
    margin: 0 @mp-lg 0 0;
    color: @font-color-default;
    font-weight: bold;

    &.mvi-form-label-block {
        width: 100%;
        text-align: left;
        margin: 0 0 @mp-sm 0;
    }
}

.mvi-form-container {
    display: block;
    width: 100%;
    flex: 1;
}
</style>
