<template>
    <m-modal ref="modal" v-model="show" :footer-padding="false" @hide="modalHide" @hidding="modalHidding" @hidden="modalHidden" :width="computedWidth" :z-index="computedZIndex" :radius="computedRadius" :use-padding="computedUsePadding" :animation="computedAnimation" @show="modalShow" @showing="modalShowing" @shown="modalShown" :timeout="computedTimeout" :overlay-color="computedOverlayColor" :mount-el="computedMountEl">
        <template v-if="computedTitle" #title>
            <div v-html="computedTitle" class="mvi-dialog-title"></div>
            <m-icon class="mvi-dialog-close" v-if="computedShowTimes" @click="cancelFun" type="times"></m-icon>
        </template>
        <template #default v-if="contentShow">
            <div v-if="computedMessage" v-html="computedMessage" class="mvi-dialog-content"></div>
            <div v-if="type == 'Prompt'" :class="['mvi-dialog-input',computedMessage?'mvi-dialog-input-mt':'']">
                <input ref="input" :type="computedInput.type=='number'?'text':computedInput.type" :placeholder="computedInput.placeholder" :maxlength="computedInput.maxlength" :class="inputClass" :style="inputStyle" v-model.trim="value" @input="inputFun" @focus="inputFocus" @blur="inputBlur" />
                <m-icon v-if="computedInput.clearable" ref="icon" v-show="showClear" type="times-o" class="mvi-dialog-times" @click="doClear" />
            </div>
            <div class="mvi-dialog-footer">
                <m-button v-if="type!='Alert'" :type="computedBtns.cancel.type" :color="computedBtns.cancel.color" :sub-color="computedBtns.cancel.subColor" :plain="computedBtns.cancel.plain" class="mvi-dialog-cancel" @click="cancelFun" :size="computedBtns.cancel.size">{{computedBtns.cancel.text}}</m-button>
                <m-button :type="computedBtns.ok.type" :color="computedBtns.ok.color" :sub-color="computedBtns.ok.subColor" :plain="computedBtns.ok.plain" @click="okFun" :size="computedBtns.ok.size">{{computedBtns.ok.text}}</m-button>
            </div>
        </template>
    </m-modal>
</template>

<script>
import $dap from 'dap-util'
import mModal from '../modal/modal'
import mIcon from '../icon/icon'
import mButton from '../button/button'
export default {
    name: 'm-dialog-pc',
    data() {
        return {
            //点击的是否是确定按钮
            ok: false,
            //对话框是否打开，默认为true，即挂载就显示
            show: true,
            //输入框是否已经获得了焦点
            focus: false,
            //输入框的值
            value: ''
        }
    },
    props: {
        //弹窗类型
        type: {
            type: String,
            default: null
        },
        //标题
        title: {
            type: String,
            default: null
        },
        //描述
        message: {
            default: ''
        },
        //按钮配置
        btns: {
            type: Object,
            default: null
        },
        //宽度
        width: {
            type: String,
            default: null
        },
        //遮罩层z-index
        zIndex: {
            type: Number,
            default: null
        },
        //动画
        animation: {
            type: String,
            default: null
        },
        //滚动条考虑
        usePadding: {
            type: Boolean,
            default: null
        },
        //圆角
        radius: {
            type: String,
            default: null
        },
        //动画时长
        timeout: {
            type: Number,
            default: null
        },
        //遮罩层颜色
        overlayColor: {
            type: String,
            default: null
        },
        //关闭按钮是否显示
        showTimes: {
            type: Boolean,
            default: null
        },
        //输入框配置
        input: {
            type: Object,
            default: null
        },
        //挂载元素
        mountEl: {
            type: String,
            default: null
        },
        //弹窗移除方法
        remove: {
            type: Function,
            default: function () {
                return function () {}
            }
        }
    },
    computed: {
        $$el() {
            return this.$refs.modal.$$el
        },
        computedMountEl() {
            if (typeof this.mountEl == 'string' && this.mountEl) {
                return this.mountEl
            } else {
                return 'body'
            }
        },
        computedShowTimes() {
            if (typeof this.showTimes == 'boolean') {
                return this.showTimes
            } else {
                return true
            }
        },
        computedTitle() {
            if (typeof this.title == 'string') {
                return this.title
            } else {
                return '提示'
            }
        },
        computedMessage() {
            if (typeof this.message == 'string') {
                return this.message
            } else if ($dap.common.isObject(this.message)) {
                return JSON.stringify(this.message)
            } else {
                return String(this.message)
            }
        },
        computedBtns() {
            let btns = {
                ok: {
                    type: 'primary',
                    color: null,
                    subColor: null,
                    plain: false,
                    text: '确定',
                    size: 'medium'
                },
                cancel: {
                    type: 'default',
                    color: null,
                    subColor: null,
                    plain: false,
                    text: '取消',
                    size: 'medium'
                }
            }
            if ($dap.common.isObject(this.btns)) {
                if ($dap.common.isObject(this.btns.ok)) {
                    if (typeof this.btns.ok.type == 'string') {
                        btns.ok.type = this.btns.ok.type
                    }
                    if (typeof this.btns.ok.color == 'string') {
                        btns.ok.color = this.btns.ok.color
                    }
                    if (typeof this.btns.ok.subColor == 'string') {
                        btns.ok.subColor = this.btns.ok.subColor
                    }
                    if (typeof this.btns.ok.plain == 'boolean') {
                        btns.ok.plain = this.btns.ok.plain
                    }
                    if (typeof this.btns.ok.text == 'string') {
                        btns.ok.text = this.btns.ok.text
                    }
                    if (typeof this.btns.ok.size == 'string') {
                        btns.ok.size = this.btns.ok.size
                    }
                }
                if ($dap.common.isObject(this.btns.cancel)) {
                    if (typeof this.btns.cancel.type == 'string') {
                        btns.cancel.type = this.btns.cancel.type
                    }
                    if (typeof this.btns.cancel.color == 'string') {
                        btns.cancel.color = this.btns.cancel.color
                    }
                    if (typeof this.btns.cancel.subColor == 'string') {
                        btns.cancel.subColor = this.btns.cancel.subColor
                    }
                    if (typeof this.btns.cancel.plain == 'boolean') {
                        btns.cancel.plain = this.btns.cancel.plain
                    }
                    if (typeof this.btns.cancel.text == 'string') {
                        btns.cancel.text = this.btns.cancel.text
                    }
                    if (typeof this.btns.cancel.size == 'string') {
                        btns.cancel.size = this.btns.cancel.size
                    }
                }
            }
            return btns
        },
        computedWidth() {
            if (typeof this.width == 'string' && this.width) {
                return this.width
            } else {
                return '7.2rem'
            }
        },
        computedInput() {
            let input = {
                placeholder: '',
                type: 'text',
                autofocus: true,
                maxlength: -1,
                clearable: false,
                align: 'left',
                value: ''
            }
            if ($dap.common.isObject(this.input)) {
                if (typeof this.input.placeholder == 'string') {
                    input.placeholder = this.input.placeholder
                }
                if (typeof this.input.type == 'string' && this.input.type) {
                    input.type = this.input.type
                }
                if (typeof this.input.autofocus == 'boolean') {
                    input.autofocus = this.input.autofocus
                }
                if ($dap.number.isNumber(this.input.maxlength)) {
                    input.maxlength = this.input.maxlength
                }
                if (typeof this.input.clearable == 'boolean') {
                    input.clearable = this.input.clearable
                }
                if (typeof this.input.align == 'string') {
                    input.align = this.input.align
                }
                if (
                    typeof this.input.value == 'string' ||
                    $dap.number.isNumber(this.input.value)
                ) {
                    input.value = this.input.value.toString()
                }
            }
            return input
        },
        computedZIndex() {
            if ($dap.number.isNumber(this.zIndex)) {
                return this.zIndex
            } else {
                return 1000
            }
        },
        computedUsePadding() {
            if (typeof this.usePadding == 'boolean') {
                return this.usePadding
            } else {
                return false
            }
        },
        computedAnimation() {
            if (typeof this.animation == 'string' && this.animation) {
                return this.animation
            } else {
                return 'translate-top'
            }
        },
        computedRadius() {
            if (typeof this.radius == 'string' && this.radius) {
                return this.radius
            } else {
                return '0.12rem'
            }
        },
        computedTimeout() {
            if ($dap.number.isNumber(this.timeout)) {
                return this.timeout
            } else {
                return 200
            }
        },
        computedOverlayColor() {
            if (typeof this.overlayColor == 'string' && this.overlayColor) {
                return this.overlayColor
            } else {
                return null
            }
        },
        contentShow() {
            if (this.type == 'Alert' || this.type == 'Confirm') {
                if (this.computedMessage) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        },
        showClear() {
            return this.focus && this.value
        },
        inputClass() {
            let cls = []
            if (this.showClear && this.computedInput.clearable) {
                cls.push('mvi-dialog-input-padding')
            }
            return cls
        },
        inputStyle() {
            let style = {}
            if (
                ['left', 'right', 'center'].includes(this.computedInput.align)
            ) {
                style.textAlign = this.computedInput.align
            }
            return style
        }
    },
    components: {
        mIcon,
        mModal,
        mButton
    },
    created() {
        //输入框存在时设置默认值
        if (this.type == 'Prompt') {
            this.setDefaultValue()
        }
    },
    methods: {
        //设置输入框默认值
        setDefaultValue() {
            let value = this.computedInput.value
            if (this.computedInput.type == 'number') {
                value = value.replace(/\D/g, '')
            }
            if (
                this.computedInput.maxlength > 0 &&
                value.length > this.computedInput.maxlength
            ) {
                value = value.substr(0, this.computedInput.maxlength)
            }
            this.value = value
        },
        //获取焦点
        inputFocus() {
            setTimeout(() => {
                this.focus = true
            }, 200)
        },
        //失去焦点
        inputBlur(e) {
            setTimeout(() => {
                this.focus = false
            }, 200)
        },
        //输入监听
        inputFun() {
            let value = this.value
            if (this.computedInput.type == 'number') {
                value = value.replace(/\D/g, '')
            }
            if (
                this.computedInput.maxlength > 0 &&
                value.length > this.computedInput.maxlength
            ) {
                value = value.substr(0, this.computedInput.maxlength)
            }
            this.value = value
        },
        //清除输入框的值
        doClear() {
            if (!this.computedInput.clearable) {
                return
            }
            this.value = ''
            this.$refs.input.focus()
        },
        //确定
        okFun() {
            this.show = false
            this.ok = true
        },
        //取消
        cancelFun() {
            this.show = false
            if (this.type == 'Alert') {
                this.ok = true
            } else {
                this.ok = false
            }
        },
        //模态框隐藏前
        modalHide(el) {
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, ['hide', this.type, el])
            }
        },
        //模态框隐藏时
        modalHidding(el) {
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, [
                    'hidding',
                    this.type,
                    el
                ])
            }
        },
        //模态框隐藏后
        modalHidden(el) {
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, ['hidden', this.type, el])
            }
            if (this.type == 'Alert') {
                this.remove()
            } else if (this.type == 'Confirm') {
                this.remove(this.ok)
            } else if (this.type == 'Prompt') {
                this.remove(this.ok, this.value)
            }
        },
        //模态框显示前
        modalShow(el) {
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, ['show', this.type, el])
            }
        },
        //模态框显示时
        modalShowing(el) {
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, [
                    'showing',
                    this.type,
                    el
                ])
            }
        },
        //模态框显示后
        modalShown(el) {
            //输入框获取焦点
            if (
                this.type == 'Prompt' &&
                this.computedInput.autofocus &&
                this.$refs.input
            ) {
                this.$refs.input.focus()
            }
            if (typeof this.dialogComponentWatch == 'function') {
                this.dialogComponentWatch.apply(this, ['shown', this.type, el])
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-dialog-title {
    display: block;
    width: 100%;
    font-size: @font-size-h6;
    color: @font-color-default;
    font-weight: bold;
    line-height: 1.5;
}

.mvi-dialog-close {
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    opacity: 0.5;
    font-size: 0.28rem;
    font-weight: normal;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
}

.mvi-dialog-content {
    color: @font-color-default;
    line-height: 1.5;
    font-size: @font-size-default;
}

.mvi-dialog-input {
    display: block;
    width: 100%;
    position: relative;

    &.mvi-dialog-input-mt {
        margin-top: @mp-md;
    }
}

.mvi-dialog-input > input {
    display: block;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: @medium-height;
    line-height: 1.5;
    border-radius: @radius-default;
    border: 1px solid @border-color;
    color: @font-color-default;
    font-size: @font-size-default;
    background-color: #fff;
    padding: 0 @mp-sm;

    &::placeholder,
    &::-webkit-input-placeholder {
        opacity: 0.5;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        vertical-align: middle;
    }

    &.mvi-dialog-input-padding {
        padding-right: @mp-sm * 3;
    }
}

.mvi-dialog-times {
    position: absolute;
    top: 50%;
    right: @mp-sm;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    color: @font-color-mute;
    cursor: pointer;
}

.mvi-dialog-footer {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 @mp-sm;
    margin-top: @mp-lg;

    .mvi-dialog-cancel {
        margin-right: @mp-md;
    }
}
</style>
