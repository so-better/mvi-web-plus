<template>
    <div :disabled="disabled || null" :class="[
			'mvi-input-container',
			'mvi-input-container-' + size,
			border ? 'mvi-input-border' : '',
			showWordLimit && maxlength > 0 ? 'mvi-input-container-words' : '',
			required ? 'mvi-input-required' : ''
		]" :data-type="type == 'textarea' ? 'textarea' : 'input'">
        <!-- 左侧图标 -->
        <div @click="leftClick" class="mvi-input-left-icon" v-if="$slots.left || leftIconUrl || leftIconType">
            <slot name="left" v-if="$slots.left"></slot>
            <m-icon v-else-if="leftIconUrl || leftIconType" :type="leftIconType" :url="leftIconUrl" :spin="leftIconSpin" :size="leftIconSize" :color="leftIconColor" />
        </div>
        <!-- 左侧文本 -->
        <div :class="['mvi-input-label',labelClass || '']" v-if="label" :style="labelStyle"><span v-text="label"></span></div>
        <!-- 文本域 -->
        <textarea v-if="type == 'textarea'" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled || null" :readonly="readonly || null" :autofocus="autofocus" class="mvi-textarea" v-model="realValue" @input="input" ref="textarea" :rows="rowsFilter" :name="name" :style="textareaStyle" @focus="getFocus" @blur="getBlur" autocomplete="off"></textarea>
        <!-- 输入框 -->
        <input v-else :type="inputType" :inputmode="computedInputMode" :placeholder="placeholder" :maxlength="isDatePicker ? -1 : maxlength" :disabled="disabled || null" :readonly="readonly || isDatePicker || null" :autofocus="autofocus" class="mvi-input" v-model="realValue" @click="callDate" @input="input" ref="input" :name="name" :style="inputStyle" @focus="getFocus" @blur="getBlur" autocomplete="off" />
        <!-- 清除图标 -->
        <div @click="doClearValue" class="mvi-input-clear-icon" v-if="clearable" v-show="showClear">
            <m-icon type="times-o" />
        </div>
        <!-- 右侧图标 -->
        <div @click="rightClick" class="mvi-input-right-icon" v-if="$slots.right || (rightIconUrl || rightIconType)">
            <slot name="right" v-if="$slots.right"></slot>
            <m-icon v-else-if="rightIconUrl || rightIconType" ref="rightIcon" :type="rightIconType" :url="rightIconUrl" :spin="rightIconSpin" :size="rightIconSize" :color="rightIconColor" />
        </div>
        <!-- 显示文字长度限制 -->
        <div v-if="showWordLimit && maxlength > 0" class="mvi-input-words">{{ realValue.length }}/{{ maxlength }}</div>
        <!-- 日期 -->
        <m-date-native-picker v-if="isDatePicker" ref="datepicker" :type="dateType" v-model="realDate">
        </m-date-native-picker>
    </div>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon'
import mDateNativePicker from '../dateNativePicker/dateNativePicker'
export default {
    name: 'm-input',
    data() {
        return {
            //输入框或者文本域是否获取焦点
            focus: false
        }
    },
    emits: [
        'update:modelValue',
        'update:date',
        'left-click',
        'right-click',
        'focus',
        'blur',
        'input',
        'clear'
    ],
    props: {
        //输入框左侧文本
        label: {
            type: String,
            default: null
        },
        //左侧文本额外类名
        labelClass: {
            type: String,
            default: null
        },
        //左侧文本宽度，默认值2rem
        labelWidth: {
            type: String,
            default: null
        },
        //左侧文本对齐方式
        labelAlign: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'center', 'right'].includes(value)
            }
        },
        //文本与输入框的间距
        labelOffset: {
            type: String,
            default: null
        },
        //输入框的值
        modelValue: {
            type: [String, Number],
            default: ''
        },
        //占位符
        placeholder: {
            type: String,
            default: ''
        },
        //输入框类型
        type: {
            type: String,
            default: 'text'
        },
        //原生name属性
        name: {
            type: String,
            default: null
        },
        //最大字数限制
        maxlength: {
            type: Number,
            default: -1
        },
        //输入框尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['medium', 'large'].includes(value)
            }
        },
        //是否显示下边框
        border: {
            type: Boolean,
            default: false
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //是否只读
        readonly: {
            type: Boolean,
            default: false
        },
        //是否显示表单必填星号
        required: {
            type: Boolean,
            default: false
        },
        //是否启用清除图标
        clearable: {
            type: Boolean,
            default: false
        },
        //是否自动聚焦
        autofocus: {
            type: Boolean,
            default: false
        },
        //是否显示字数统计，需要设置maxlength属性
        showWordLimit: {
            type: Boolean,
            default: false
        },
        //文本左侧图标
        leftIcon: {
            type: [String, Object],
            default: null
        },
        //右侧图标
        rightIcon: {
            type: [String, Object],
            default: null
        },
        //日期选择的默认日期
        date: {
            type: Date,
            default: null
        },
        //输入框中显示的日期格式
        format: {
            type: String,
            default: null
        },
        //type=textarea时的行数
        rows: {
            type: Number,
            default: 1
        },
        //自动调整高度
        autosize: {
            type: [Boolean, Object],
            default: false,
            validator(value) {
                if ($dap.common.isObject(value)) {
                    if (
                        $dap.number.isNumber(value.minRows) &&
                        $dap.number.isNumber(value.maxRows)
                    ) {
                        if (value.minRows > value.maxRows) {
                            return false
                        }
                    }
                }
                return true
            }
        },
        //文本对齐方式
        inputAlign: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'center', 'right'].includes(value)
            }
        },
        //输入框调起移动端键盘类型
        inputMode: {
            type: [String, Boolean],
            default: false,
            validator(value) {
                return [
                    false,
                    'none',
                    'text',
                    'decimal',
                    'numeric',
                    'tel',
                    'search',
                    'email',
                    'url'
                ].includes(value)
            }
        }
    },
    computed: {
        showClear() {
            if (this.disabled || this.readonly) {
                return false
            }
            if (this.focus) {
                if (this.realValue === '') {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        },
        leftIconType() {
            let type = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.type == 'string') {
                    type = this.leftIcon.type
                }
            } else if (typeof this.leftIcon == 'string') {
                type = this.leftIcon
            }
            return type
        },
        leftIconUrl() {
            let url = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.url == 'string') {
                    url = this.leftIcon.url
                }
            }
            return url
        },
        leftIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.spin == 'boolean') {
                    spin = this.leftIcon.spin
                }
            }
            return spin
        },
        leftIconSize() {
            let size = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.size == 'string') {
                    size = this.leftIcon.size
                }
            }
            return size
        },
        leftIconColor() {
            let color = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.color == 'string') {
                    color = this.leftIcon.color
                }
            }
            return color
        },
        rightIconType() {
            let type = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.type == 'string') {
                    type = this.rightIcon.type
                }
            } else if (typeof this.rightIcon == 'string') {
                type = this.rightIcon
            }
            return type
        },
        rightIconUrl() {
            let url = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.url == 'string') {
                    url = this.rightIcon.url
                }
            }
            return url
        },
        rightIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.spin == 'boolean') {
                    spin = this.rightIcon.spin
                }
            }
            return spin
        },
        rightIconSize() {
            let size = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.size == 'string') {
                    size = this.rightIcon.size
                }
            }
            return size
        },
        rightIconColor() {
            let color = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.color == 'string') {
                    color = this.rightIcon.color
                }
            }
            return color
        },
        //原生日期选择的值
        realDate: {
            set(value) {
                this.$emit('update:date', value)
            },
            get() {
                return this.date
            }
        },
        //输入框的值
        realValue: {
            set(value) {
                if (this.modelValue !== value) {
                    this.$emit('update:modelValue', value)
                }
            },
            get() {
                let value =
                    this.modelValue === null ? '' : this.modelValue.toString()
                if (this.isDatePicker) {
                    value = this.getDateValue()
                } else {
                    //数字类型会过滤非数字字符
                    if (this.type == 'number') {
                        value = value.replace(/\D/g, '')
                    }
                    //如果设置了maxlength，则进行字符串截取
                    if (this.maxlength > 0 && value.length > this.maxlength) {
                        value = value.substr(0, this.maxlength)
                    }
                }
                if (this.modelValue !== value) {
                    this.$emit('update:modelValue', value)
                }
                return value
            }
        },
        //输入框的type值
        inputType() {
            let type = 'text'
            if (this.isDatePicker || this.type == 'number') {
                type = 'text'
            } else {
                type = this.type
            }
            return type
        },
        //键盘模式
        computedInputMode() {
            let mode = false
            if (typeof this.inputMode == 'string') {
                mode = this.inputMode
            }
            return mode
        },
        //datepicker组件的type值
        dateType() {
            let type = 'date'
            if (this.isDatePicker) {
                type = this.type
            }
            return type
        },
        //判断是否日期选择
        isDatePicker() {
            return ['date', 'datetime', 'month', 'time'].includes(this.type)
        },
        //文本域的rows
        rowsFilter() {
            let rows = this.rows
            if ($dap.common.isObject(this.autosize)) {
                if ($dap.number.isNumber(this.autosize.minRows)) {
                    if (this.rows < this.autosize.minRows) {
                        rows = this.autosize.minRows
                    }
                }
                if ($dap.number.isNumber(this.autosize.maxRows)) {
                    if (this.rows > this.autosize.maxRows) {
                        rows = this.autosize.maxRows
                    }
                }
            }
            return rows
        },
        //label的样式
        labelStyle() {
            let style = {}
            if (this.labelWidth) {
                style.width = this.labelWidth
            }
            if (this.labelAlign) {
                if (this.labelAlign == 'left') {
                    style.justifyContent = 'flex-start'
                } else if (this.labelAlign == 'right') {
                    style.justifyContent = 'flex-end'
                } else {
                    style.justifyContent = this.labelAlign
                }
            }
            if (this.labelOffset) {
                style.marginRight = this.labelOffset
            }
            return style
        },
        //输入框样式
        inputStyle() {
            let style = {}
            if (this.inputAlign) {
                style.textAlign = this.inputAlign
            }
            return style
        },
        //文本域样式
        textareaStyle() {
            let style = {}
            if (this.inputAlign) {
                style.textAlign = this.inputAlign
            }
            return style
        }
    },
    components: {
        mIcon,
        mDateNativePicker
    },
    mounted() {
        if (this.$refs.textarea) {
            this.setMaxMinHeight()
            if (this.autosize == true || $dap.common.isObject(this.autosize)) {
                this.autosizeSet()
            }
        }
    },
    watch: {
        realValue(newValue) {
            if (
                this.$refs.textarea &&
                (this.autosize == true || $dap.common.isObject(this.autosize))
            ) {
                this.autosizeSet()
            }
        },
        rows(newValue) {
            if (this.$refs.textarea) {
                this.setMaxMinHeight()
            }
        },
        autosize(newValue) {
            if (this.$refs.textarea) {
                this.setMaxMinHeight()
            }
        },
        showClear(newValue) {
            this.$nextTick(() => {
                if (
                    this.$refs.textarea &&
                    (this.autosize == true ||
                        $dap.common.isObject(this.autosize))
                ) {
                    this.autosizeSet()
                }
            })
        }
    },
    methods: {
        //输入框或者文本域获取焦点
        getFocus(e) {
            if (this.disabled) {
                return
            }
            this.$emit('focus', this.realValue)
            setTimeout(() => {
                this.focus = true
            }, 200)
        },
        //输入框或者文本域失去焦点
        getBlur(e) {
            if (this.disabled) {
                return
            }
            this.$emit('blur', this.realValue)
            setTimeout(() => {
                this.focus = false
            }, 200)
        },
        //左侧图标点击
        leftClick() {
            if (this.disabled) {
                return
            }
            this.$emit('left-click', this.realValue)
        },
        //右侧图标点击
        rightClick() {
            if (this.disabled) {
                return
            }
            this.$emit('right-click', this.realValue)
        },
        //清除输入框
        doClearValue() {
            if (this.disabled) {
                return
            }
            if (!this.clearable) {
                return
            }
            this.realValue = ''
            if (this.type == 'textarea') {
                this.$refs.textarea.focus()
            } else if (this.isDatePicker) {
                this.realDate = null
            } else {
                this.$refs.input.focus()
            }
            this.$emit('clear', '')
        },
        //输入框监听
        input(e) {
            if (this.disabled) {
                return
            }
            this.$emit('input', this.realValue)
        },
        //高度自适应设置
        autosizeSet() {
            this.$refs.textarea.style.height = 'auto'
            this.$refs.textarea.scrollTop = 0
            this.$refs.textarea.style.height =
                $dap.element.getScrollHeight(this.$refs.textarea) + 'px'
        },
        //行数转为高度
        rows2Height(rows) {
            let lineHeight = Math.floor(
                parseFloat(
                    $dap.element.getCssStyle(this.$refs.textarea, 'line-height')
                )
            )
            return rows * lineHeight
        },
        //设置最大高度和最小高度
        setMaxMinHeight() {
            if ($dap.common.isObject(this.autosize)) {
                if ($dap.number.isNumber(this.autosize.maxRows)) {
                    let maxHeight = this.rows2Height(this.autosize.maxRows)
                    this.$refs.textarea.style.maxHeight = maxHeight + 'px'
                }
                if ($dap.number.isNumber(this.autosize.minRows)) {
                    let minHeight = this.rows2Height(this.autosize.minRows)
                    this.$refs.textarea.style.minHeight = minHeight + 'px'
                }
            } else {
                this.$refs.textarea.style.maxHeight = ''
                this.$refs.textarea.style.minHeight = ''
            }
        },
        //调起日历
        callDate() {
            //如果是日历输入框
            if (this.isDatePicker && !this.disabled && !this.readonly) {
                this.$refs.datepicker.trigger()
            }
        },
        //选择日期后转换成输入框的value值
        getDateValue() {
            if (this.date instanceof Date) {
                if (this.dateType == 'date') {
                    let year = this.date.getFullYear()
                    let month =
                        this.date.getMonth() + 1 < 10
                            ? '0' + (this.date.getMonth() + 1)
                            : this.date.getMonth() + 1
                    let date =
                        this.date.getDate() < 10
                            ? '0' + this.date.getDate()
                            : this.date.getDate()
                    if (this.format == 'yyyy年mm月dd日') {
                        return year + '年' + month + '月' + date + '日'
                    } else if (this.format == 'yyyy/mm/dd') {
                        return year + '/' + month + '/' + date
                    } else if (this.format == 'yyyy.mm.dd') {
                        return year + '.' + month + '.' + date
                    } else {
                        return year + '-' + month + '-' + date
                    }
                } else if (this.dateType == 'datetime') {
                    let year = this.date.getFullYear()
                    let month =
                        this.date.getMonth() + 1 < 10
                            ? '0' + (this.date.getMonth() + 1)
                            : this.date.getMonth() + 1
                    let date =
                        this.date.getDate() < 10
                            ? '0' + this.date.getDate()
                            : this.date.getDate()
                    let hour =
                        this.date.getHours() < 10
                            ? '0' + this.date.getHours()
                            : this.date.getHours()
                    let minutes =
                        this.date.getMinutes() < 10
                            ? '0' + this.date.getMinutes()
                            : this.date.getMinutes()
                    if (this.format == 'yyyy年MM月dd日hh时mm分') {
                        return (
                            year +
                            '年' +
                            month +
                            '月' +
                            date +
                            '日' +
                            hour +
                            '时' +
                            minutes +
                            '分'
                        )
                    } else if (this.format == 'yyyy年MM月dd日 hh:mm') {
                        return (
                            year +
                            '年' +
                            month +
                            '月' +
                            date +
                            '日' +
                            ' ' +
                            hour +
                            ':' +
                            minutes
                        )
                    } else if (this.format == 'yyyy/MM/dd hh:mm') {
                        return (
                            year +
                            '/' +
                            month +
                            '/' +
                            date +
                            ' ' +
                            hour +
                            ':' +
                            minutes
                        )
                    } else if (this.format == 'yyyy.MM.dd hh:mm') {
                        return (
                            year +
                            '.' +
                            month +
                            '.' +
                            date +
                            ' ' +
                            hour +
                            ':' +
                            minutes
                        )
                    } else {
                        return (
                            year +
                            '-' +
                            month +
                            '-' +
                            date +
                            ' ' +
                            hour +
                            ':' +
                            minutes
                        )
                    }
                } else if (this.dateType == 'month') {
                    let year = this.date.getFullYear()
                    let month =
                        this.date.getMonth() + 1 < 10
                            ? '0' + (this.date.getMonth() + 1)
                            : this.date.getMonth() + 1
                    if (this.format == 'yyyy年mm月') {
                        return year + '年' + month + '月'
                    } else if (this.format == 'yyyy/mm') {
                        return year + '/' + month
                    } else if (this.format == 'yyyy.mm') {
                        return year + '.' + month
                    } else {
                        return year + '-' + month
                    }
                } else if (this.dateType == 'time') {
                    let hour =
                        this.date.getHours() < 10
                            ? '0' + this.date.getHours()
                            : this.date.getHours()
                    let minutes =
                        this.date.getMinutes() < 10
                            ? '0' + this.date.getMinutes()
                            : this.date.getMinutes()
                    if (this.format == 'hh时mm分') {
                        return hour + '时' + minutes + '分'
                    } else {
                        return hour + ':' + minutes
                    }
                } else {
                    return ''
                }
            } else {
                return ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

//输入框组件容器
.mvi-input-container {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    position: relative;
    background-color: #fff;
    color: @font-color-default;
    font-size: @font-size-default;
    margin: 0;
    vertical-align: middle;
    width: 100%;
    padding: @mp-sm @mp-md;
}

//是否显示边框
.mvi-input-container.mvi-input-border::after {
    display: block;
    content: '';
    position: absolute;
    left: @mp-sm;
    bottom: 0;
    width: calc(~'100% - @{mp-xs}*2');
    height: 0;
    border-bottom: 1px solid @border-color;
    box-sizing: content-box;
}

//必填标识
.mvi-input-container.mvi-input-required::before {
    position: absolute;
    left: @mp-xs;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    content: '*';
    font-family: '宋体', 'SimSun';
    color: @error-normal;
}

//必填标志大小
.mvi-input-container.mvi-input-container-medium.mvi-input-required {
    font-size: @font-size-default;
}

.mvi-input-container.mvi-input-container-large.mvi-input-required {
    font-size: @font-size-h6;
}

//禁用样式
.mvi-input-container[disabled] {
    opacity: 0.6;
}

//label文字
.mvi-input-container > .mvi-input-label {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0 @mp-sm 0 0;
    position: relative;
    width: 1rem;
    vertical-align: middle;

    span {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}

//左侧图标样式
.mvi-input-container > .mvi-input-left-icon {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    margin-right: @mp-sm;
    vertical-align: middle;
}

//右侧图标样式
.mvi-input-container > .mvi-input-right-icon {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    margin-left: @mp-sm;
}

//清除图标
.mvi-input-container > .mvi-input-clear-icon {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    margin-left: @mp-sm;
    width: 0.3rem;
    vertical-align: middle;
    cursor: pointer;
}

//中等输入框时label、左侧图标、右侧图标、清除图标高度以及字体大小
.mvi-input-container.mvi-input-container-medium .mvi-input-label,
.mvi-input-container.mvi-input-container-medium .mvi-input-left-icon,
.mvi-input-container.mvi-input-container-medium .mvi-input-right-icon,
.mvi-input-container.mvi-input-container-medium .mvi-input-clear-icon {
    font-size: @font-size-default;
    height: 0.48rem;
}

//较大输入框时label、左侧图标、右侧图标、清除图标高度以及字体大小
.mvi-input-container.mvi-input-container-large .mvi-input-label,
.mvi-input-container.mvi-input-container-large .mvi-input-left-icon,
.mvi-input-container.mvi-input-container-large .mvi-input-right-icon,
.mvi-input-container.mvi-input-container-large .mvi-input-clear-icon {
    font-size: @font-size-h6;
    height: 0.6rem;
}

/* 非文本域时的样式 */
.mvi-input-container[data-type='input'] {
    align-items: center;
}

//输入框
.mvi-input-container > .mvi-input {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    border-radius: 0;
    color: inherit;
    background-color: inherit;
    flex: 1;
    font-family: @font-family;
    background-image: none;
    margin: 0;

    &::-webkit-input-placeholder,
    &::placeholder {
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        opacity: 0.5;
        vertical-align: middle;
    }

    &[disabled] {
        background-color: inherit;
        color: inherit;
        opacity: 1;
    }
}

//不同大小的输入框
.mvi-input-container.mvi-input-container-medium .mvi-input {
    height: 0.48rem;
    font-size: @font-size-default;
}

.mvi-input-container.mvi-input-container-large .mvi-input {
    height: 0.6rem;
    font-size: @font-size-h6;
}

//文本域时的样式
.mvi-input-container[data-type='textarea'] {
    align-items: flex-start;
}

//文本域
.mvi-input-container > .mvi-textarea {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    flex: 1;
    padding: 0;
    border: none;
    border-radius: 0;
    height: auto;
    resize: none;
    color: inherit;
    background-color: inherit;
    font-family: @font-family;
    background-image: none;
    margin: 0;

    &::-webkit-input-placeholder,
    &::placeholder {
        color: inherit;
        opacity: 0.5;
        font-family: inherit;
        font-size: inherit;
        vertical-align: middle;
    }
}

//不同大小的文本域
.mvi-input-container.mvi-input-container-medium .mvi-textarea {
    line-height: 0.48rem;
    font-size: @font-size-default;
}

.mvi-input-container.mvi-input-container-large .mvi-textarea {
    line-height: 0.6rem;
    font-size: @font-size-h6;
}

//文字长度限制
.mvi-input-container.mvi-input-container-words {
    padding-bottom: @mp-lg+ @mp-xs;
}

.mvi-input-container.mvi-input-container-words > .mvi-input-words {
    position: absolute;
    bottom: @mp-xs;
    right: @mp-sm;
    width: 100%;
    line-height: 1;
    text-align: right;
    color: inherit;
    opacity: 0.5;
    font-size: @font-size-small;
}
</style>
